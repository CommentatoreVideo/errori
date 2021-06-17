import {Errore} from "./../interfaces";
export interface ErroriProps {
  errori:Errore[]
}
 
const Errori: React.FunctionComponent<ErroriProps> = ({errori}) => {
  const tbody=errori.map(errore=>{
    let riga=[];
    riga.push(<td>{errore.data}</td>);
    riga.push(<td>{errore.descrizione}</td>);
    riga.push(<td>{errore.minuti}</td>);
    riga.push(<td><a href={errore.video}>Link</a></td>);
    return <tr>{riga}</tr>;
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
      <tbody>
        {tbody}
      </tbody>
    </table>
   );
}
 
export default Errori;