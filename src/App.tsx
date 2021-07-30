import {useEffect, useState} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Form from "./components/form/Form";
import firebase from "firebase/app";
import "firebase/firestore";
import Errori from "./components/Errori";
import {Errore} from "./interfaces";
import "@popperjs/core";
import "bootstrap/dist/js/bootstrap";
const globalAny: any = global;
require("dotenv").config();
globalAny.jQuery = require("jquery");

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};

function App() {
	const niente: Errore[] = [];
	const [errori, setErrori] = useState(niente);
	let tutto: any;
	const [db, setDb] = useState(tutto);
	const [attivo, setAttivo] = useState("");
	useEffect(function () {
		(async () => {
			try {
				firebase.initializeApp(firebaseConfig);
			} catch (e) {}
			// database
			const db = firebase.firestore();
			setDb(db);
			// data
			let data = await db.collection("errori").get();
			// shopping list items: name, count and id
			const errori: Errore[] = data.docs.map(doc => {
				return {
					data: doc.data().data,
					descrizione: doc.data().descrizione,
					minuti: doc.data().minutaggio,
					video: doc.data().url,
					id: doc.id,
				};
			}).sort((e1,e2)=>{
        const [giorno1,mese1,anno1]=e1.data.split("/");
        const [giorno2,mese2,anno2]=e2.data.split("/");
        if(anno1!==anno2) return anno2-anno1;
        if(mese1!==mese2) return mese2-mese1;
        return giorno2-giorno1;
      });
			setErrori(errori);
		})();
	}, []);
	return (
		<div className="container-fluid">
			<Navbar attivo={attivo} setAttivo={setAttivo}></Navbar>
			{attivo === "Errori" ? <Errori errori={errori} setErrori={setErrori} db={db}></Errori> : ""}
			{attivo === "Aggiungi errore" ? <Form database={db} errori={errori} setErrori={setErrori}></Form> : ""}
		</div>
	);
}

export default App;
