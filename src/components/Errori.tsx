import {Errore} from "./../interfaces";
import firebase from "firebase";
export interface ErroriProps {
	errori: Errore[];
	db: firebase.firestore.Firestore;
  setErrori:(func:any)=>any;
}

const Errori: React.FunctionComponent<ErroriProps> = ({errori, db,setErrori}) => {
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
		return <tr key={id}>{riga}</tr>;
	});
	return (
		<table className="table">
			<thead>
				<tr>
					<th>Data</th>
					<th>Descrizione</th>
					<th>Minutaggio</th>
					<th>Link</th>
				</tr>
			</thead>
			<tbody>{tbody}</tbody>
		</table>
	);
};

export default Errori;
