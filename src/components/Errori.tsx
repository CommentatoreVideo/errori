import {Errore} from "./../interfaces";
import firebase from "firebase";
export interface ErroriProps {
	errori: Errore[];
	db: firebase.firestore.Firestore;
  setErrori:(func:any)=>any;
}

const Errori: React.FunctionComponent<ErroriProps> = ({errori, db,setErrori}) => {
	async function elimina(id: string) {
		try {
			await db.collection("errori").doc(id).delete();
			alert("Errore eliminato correttamente");
      setErrori((errori:Errore[])=>errori.filter(errore=>errore.id!==id));
		} catch (e) {
			alert("Errore nell'eliminazione. Controlla la console per maggiori dettagli");
      console.log(e);
		}
	}
	const tbody = errori.map(errore => {
		let riga = [];
		riga.push(<td key={errore.id + "1"}>{errore.data}</td>);
		riga.push(<td key={errore.id + "2"}>{errore.descrizione}</td>);
		riga.push(<td key={errore.id + "3"}>{errore.minuti}</td>);
		riga.push(
			<td key={errore.id + "4"}>
				<a href={errore.video}>Link</a>
			</td>
		);
		riga.push(
			<td key={errore.id + "5"}>
				<button className="btn btn-danger" onClick={() => elimina(errore.id)}>
					Elimina
				</button>
			</td>
		);
		return <tr key={errore.id}>{riga}</tr>;
	});
	return (
		<table className="table">
			<thead>
				<tr>
					<th>Data</th>
					<th>Descrizione</th>
					<th>Minutaggio</th>
					<th>Link</th>
					<th>Elimina</th>
				</tr>
			</thead>
			<tbody>{tbody}</tbody>
		</table>
	);
};

export default Errori;
