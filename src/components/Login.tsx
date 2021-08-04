import {useState} from "react";

export interface LoginProps {
	setLogged: (logged: boolean) => any;
}

const Login: React.FunctionComponent<LoginProps> = ({setLogged}) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errorVisibile, setErrorVisibile] = useState(false);
	function inviato(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (username !== process.env.REACT_APP_USERNAME) setErrorVisibile(true);
		else if (password !== process.env.REACT_APP_PASSWORD) setErrorVisibile(true);
		else setLogged(true);
	}
	function inputUsername(e: any) {
		setUsername(e.target.value);
		setErrorVisibile(false);
	}
	function inputPassword(e: any) {
		setPassword(e.target.value);
		setErrorVisibile(false);
	}
	return (
		<div className="card col-12 col-lg-4 login-card mt-2 hv-center">
			{errorVisibile ? <div className="alert alert-danger">Errore! Username e/o password errati</div> : null}
			<form onSubmit={inviato}>
				<div className="form-group text-left mt-1">
					<label htmlFor="txtUsername">Username</label>
					<input type="text" id="txtUsername" value={username} onInput={inputUsername} className="form-control" />
				</div>
				<div className="form-group text-left mt-1">
					<label htmlFor="txtPassword">Password</label>
					<input className="form-control" type="password" value={password} onInput={inputPassword} id="txtPassword" />
				</div>
				<button className="btn btn-primary mt-1" type="submit">
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
