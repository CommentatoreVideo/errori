import { Errore } from "../interfaces";
import firebase from "firebase/app";
import TextField from "./form/TextField";
export interface FormModificaProps {
  data:string;
  descrizione:string;
  minutaggio:string;
  url:string;
  id:string;
  setErrori:(errori:any)=>any;
  setData:(data:string)=>any;
  setDescrizione:(descrizione:string)=>any;
  setMinutaggio:(minutaggio:string)=>any;
  setUrl:(url:string)=>any;
  db:firebase.firestore.Firestore;
  setFormVisibile:(formVisibile:boolean)=>any;
}
 
const FormModifica: React.FunctionComponent<FormModificaProps> = ({setFormVisibile,db,data,descrizione,minutaggio,url,setData,setDescrizione,setMinutaggio,setUrl,id,setErrori}) => {
  async function formModifica(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
			await db.collection("errori").doc(id).update({
        data,descrizione,minutaggio,url
      });
			alert("Errore modificato correttamente correttamente");
			setErrori((errori: Errore[]) => errori.filter(errore => errore.id !== id));
      setErrori((errori:Errore[])=>{
        return [...errori,
        {
          data,descrizione,video:url,id,minuti:minutaggio
        }]
      })
		} catch (e) {
			alert("Errore nell'aggiornamento. Controlla la console per maggiori dettagli");
			console.log(e);
		}
  }
  return ( 
    <form onSubmit={formModifica}>
      <TextField label="Data" value={data} setValue={setData} placeholder="Inserisci la nuova data"></TextField>
      <TextField label="Descrizione" value={descrizione} setValue={setDescrizione} placeholder="Inserisci la nuova descrizione"></TextField>
      <TextField label="Minutaggio" value={minutaggio} setValue={setMinutaggio} placeholder="Inserisci il nuovo minutaggio"></TextField>
      <TextField label="Link" value={url} setValue={setUrl} placeholder="Inserisci il nuovo link"></TextField>
      <button className="btn btn-success m-1">Salva</button>
      <button type="button" className="btn btn-primary m-1" onClick={()=>setFormVisibile(false)}>Esci</button>
    </form>
   );
}
 
export default FormModifica;