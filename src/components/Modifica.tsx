import firebase from "firebase/app";
import {useState} from "react";
import {Errore} from "../interfaces";
import TextField from "./form/TextField";
import FormModifica from "./FormModifica";
import Login from "./Login";
export interface ModificaProps {
	setLogged: (logged: boolean) => any;
	logged: boolean;
	database: firebase.firestore.Firestore;
	errori: Errore[];
	setErrori: (errori: any) => any;
}

const Modifica: React.FunctionComponent<ModificaProps> = ({setLogged, logged, database: db, errori, setErrori}) => {
	const [data, setData] = useState("");
	const [descrizione, setDescrizione] = useState("");
	const [minutaggio, setMinutaggio] = useState("");
	const [url, setUrl] = useState("");
	const [id, setId] = useState("");
	const [formVisibile, setFormVisibile] = useState(false);

	function modifica(id: string) {
		const errore = errori.find(errore => errore.id === id);
		if (errore === undefined) return;
		setData(errore.data);
		setDescrizione(errore.descrizione);
		setMinutaggio(errore.minuti);
		setUrl(errore.video);
		setId(id);
		setFormVisibile(true);
	}
	async function elimina(id: string) {
		try {
			await db.collection("errori").doc(id).delete();
			alert("Errore eliminato correttamente");
			setErrori((errori: Errore[]) => errori.filter(errore => errore.id !== id));
		} catch (e) {
			alert("Errore nell'eliminazione. Controlla la console per maggiori dettagli");
			console.log(e);
		}
	}
	const tbody = errori.map(errore => {
		let riga = [];
		const {id, data, descrizione, minuti, video} = errore;
		riga.push(<td key={`${id}1`}>{data}</td>);
		riga.push(<td key={`${id}2`}>{descrizione}</td>);
		riga.push(<td key={`${id}3`}>{minuti}</td>);
		riga.push(
			<td key={`${id}4`}>
				<a href={video}>Link</a>
			</td>
		);
		riga.push(
			<td key={`${id}5`}>
				<button className="btn btn-danger" onClick={() => elimina(id)}>
					Elimina
				</button>
			</td>
		);
		riga.push(
			<td key={`${id}6`}>
				<button className="btn btn-primary" onClick={() => modifica(id)}>
					Modifica
				</button>
			</td>
		);
		return <tr key={id}>{riga}</tr>;
	});
	if (!logged)
		return (
			<div className="container-fluid">
				<Login setLogged={setLogged}></Login>
			</div>
		);
	if (formVisibile) return <FormModifica setFormVisibile={setFormVisibile} setErrori={setErrori} data={data} descrizione={descrizione} minutaggio={minutaggio} url={url} id={id} setData={setData} setDescrizione={setDescrizione} setMinutaggio={setMinutaggio} setUrl={setUrl} db={db}></FormModifica>;

	return (
		<>
			<table className="table">
				<thead>
					<tr>
						<th>Data</th>
						<th>Descrizione</th>
						<th>Minutaggio</th>
						<th>Link</th>
						<th>Elimina</th>
						<th>Modifica</th>
					</tr>
				</thead>
				<tbody>{tbody}</tbody>
			</table>
		</>
	);
};

export default Modifica;
