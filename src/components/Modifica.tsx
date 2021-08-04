import firebase from "firebase/app";
import { Errore } from "../interfaces";
import Login from "./Login";
export interface ModificaProps {
  setLogged:(logged:boolean)=>any;
  logged:boolean;
	database: firebase.firestore.Firestore;
  errori:Errore[];
  setErrori:(errori:any)=>any;
}
 
const Modifica: React.FunctionComponent<ModificaProps> = ({setLogged,logged,database:db,errori,setErrori}) => {
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
		const {id,data,descrizione,minuti,video}=errore;
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
		return <tr key={id}>{riga}</tr>;
	});
  if (!logged)
		return (
			<div className="container-fluid">
				<Login setLogged={setLogged}></Login>
			</div>
		);
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
}
 
export default Modifica;