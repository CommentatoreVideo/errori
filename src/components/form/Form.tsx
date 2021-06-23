import {useState} from "react";
import TextArea from "./TextArea";
import TextField from "./TextField";
import Data from "./Data";
import firebase from "firebase/app";
import {Errore} from "./../../interfaces";

export interface FormProps {
	database: firebase.firestore.Firestore;
	errori: Errore[];
	setErrori: (e:any) => any;
}

const Form: React.FunctionComponent<FormProps> = ({database, setErrori, errori}) => {
	const [descrizione, setDescrizione] = useState("");
	const [data, setData] = useState("");
	const [minutaggio, setMinutaggio] = useState("");
	const [url, setUrl] = useState("");

	async function premuto() {
		const controllo = controllaDati(descrizione, data, minutaggio, url);
		if (controllo !== "") return alert(controllo);
		const newDate = formattaData(data);
		if (newDate === "") return alert("C'è stato un problema sconosciuto");
		const res = await database.collection("errori").add({
			descrizione,
			data: newDate,
			minutaggio,
			url,
		});
		setErrori((errori:Errore[]) => {
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
	let stringa = "";
	const regexMinutaggio = /^\d?\d?:?\d?\d:\d\d$/;
	if (descrizione === "") stringa = "Descrizione non valida";
	if (data === "") stringa = "Data non valida";
	if (!regexMinutaggio.test(minutaggio)) stringa = "Minutaggio non valido";
	if (url === "") stringa = "Url non valido";
	return stringa;
}

function formattaData(data: string) {
	const regexData = /(\d{4})-(\d{2})-(\d{2})/;
	const ris = regexData.exec(data);
	if (ris != null) {
		const [, anno, mese, giorno] = ris;
		return `${giorno}/${mese}/${anno}`;
	}
	return "";
}
