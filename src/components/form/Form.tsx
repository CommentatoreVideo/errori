import {useState} from "react";
import TextArea from "./TextArea";
import TextField from "./TextField";
import Data from "./Data";
import firebase from "firebase/app";
import {Errore} from "./../../interfaces";

export interface FormProps {
  database:firebase.firestore.Firestore;
	errori:Errore[];
	setErrori:(errore:Errore[])=>any
}

const Form: React.FunctionComponent<FormProps> = ({database,setErrori,errori}) => {
	const [descrizione, setDescrizione] = useState("");
	const [data, setData] = useState("");
	const [minutaggio, setMinutaggio] = useState("");
	const [url, setUrl] = useState("");

	async function premuto() {
		const regexMinutaggio = /^\d?\d?:?\d?\d:\d\d$/;
		const regexData=/(\d{4})-(\d{2})-(\d{2})/;
		if (descrizione === "") return alert("Descrizione non valida");
		if (data === "") return alert("Data non valida");
		if (!regexMinutaggio.test(minutaggio))
			return alert("Minutaggio non valido");
		if (url === "") return alert("Url non valido");
		const ris=regexData.exec(data);
		let newDate=data;
		if(ris!=null) {
			const [,anno,mese,giorno]=ris;
			newDate=`${giorno}/${mese}/${anno}`;
		}
    const res=await database.collection("errori").add({
      descrizione,data:newDate,minutaggio,url
    });
		setErrori([...errori,{
			descrizione,data:newDate,minuti:minutaggio,id:res.id,video:url
		}]);
		
		
	}

	return (
		<>
			<TextArea
				label="Descrizione"
				placeholder="Inserisci la descrizione"
				value={descrizione}
				setValue={setDescrizione}></TextArea>
			<Data
				data={data}
				setData={setData}
				label="Data"
				placeholder="Inserisci la data"></Data>
			<TextField
				value={minutaggio}
				setValue={setMinutaggio}
				label="Minutaggio"
				placeholder="Inserisci il minutaggio"></TextField>
			<TextField
				value={url}
				setValue={setUrl}
				label="Url"
				placeholder="Inserisci il link al video"></TextField>
			<button className="btn btn-primary" onClick={premuto}>
				Crea
			</button>
		</>
	);
};

export default Form;
