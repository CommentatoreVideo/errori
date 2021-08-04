import {DataProps} from "../../interfaces";

const Data: React.FunctionComponent<DataProps> = ({id, data, setData, placeholder, label}) => {
	const cambiato=(e:any)=>setData(e.target.value);
	return (
		<div className="form-group">
			<label htmlFor={id}>{label}</label>
			<input className="form-control" type="date" id={id} value={data} onChange={cambiato} placeholder={placeholder} />
		</div>
	);
};

export default Data;
