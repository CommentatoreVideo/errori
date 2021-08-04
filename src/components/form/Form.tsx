import {useState} from "react";
import TextArea from "./TextArea";
import TextField from "./TextField";
import Data from "./Data";
import firebase from "firebase/app";
import {Errore} from "./../../interfaces";
import Login from "../Login";
//TODO: Spostare questa interface nel suo file dedicato
export interface FormProps {
	database: firebase.firestore.Firestore;
	errori: Errore[];
	setErrori: (e: any) => any;
	logged:boolean;
	setLogged:(logged:boolean)=>any;
}

const Form: React.FunctionComponent<FormProps> = ({database, setErrori,logged,setLogged}) => {
	const [descrizione, setDescrizione] = useState("");
	const [data, setData] = useState("");
	const [minutaggio, setMinutaggio] = useState("");
	const [url, setUrl] = useState("");

	async function premuto() {
		const risultatoControlloDati = controllaDati(descrizione, data, minutaggio, url);
		if (risultatoControlloDati !== "") return alert(risultatoControlloDati);
		const newDate = formattaData(data);
		if (newDate === "") return alert("C'è stato un problema sconosciuto");
		const res = await database.collection("errori").add({
			descrizione,
			data: newDate,
			minutaggio,
			url,
		});
		setErrori((errori: Errore[]) => {
			alert("Errore aggiunto correttamente");
			return [
				...errori,
				{
					descrizione,
					data: newDate,
					minuti: minutaggio,
					id: res.id,
					video: url,
				},
			];
		});
	}
	if (!logged)
		return (
			<div className="container-fluid">
				<Login setLogged={setLogged}></Login>
			</div>
		);
	return (
		<>
			<TextArea label="Descrizione" placeholder="Inserisci la descrizione" value={descrizione} setValue={setDescrizione}></TextArea>
			<Data data={data} setData={setData} label="Data" placeholder="Inserisci la data"></Data>
			<TextField value={minutaggio} setValue={setMinutaggio} label="Minutaggio" placeholder="Inserisci il minutaggio"></TextField>
			<TextField value={url} setValue={setUrl} label="Url" placeholder="Inserisci il link al video"></TextField>
			<button className="btn btn-primary" onClick={premuto}>
				Crea
			</button>
		</>
	);
};

export default Form;

function controllaDati(descrizione: string, data: string, minutaggio: string, url: string) {
	const regexMinutaggio = /^(\d{2}):?\d{1,2}:\d{2}$/;
	if (descrizione === "") return "Descrizione non valida";
	if (data === "") return "Data non valida";
	if (!regexMinutaggio.test(minutaggio)) return "Minutaggio non valido";
	if (url === "") return "Url non valido";
	return "";
}

function formattaData(data: string) {
	const regexData = /(\d{4})-(\d{2})-(\d{2})/;
	const ris = regexData.exec(data);
	if (ris === null) return "";
	const [, anno, mese, giorno] = ris;
	return `${giorno}/${mese}/${anno}`;
}
