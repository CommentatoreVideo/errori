import {TextFieldProps} from "../../interfaces";

const TextField: React.FunctionComponent<TextFieldProps> = ({label, id, value, setValue, placeholder}) => {
    const cambiato = (e: any) => setValue(e.target.value);
    return (
		<div className="form-group">
			<label htmlFor={id}>{label}</label>
			<input className="form-control" type="text" id={id} value={value} onChange={cambiato} placeholder={placeholder} />
		</div>
	);
};

export default TextField;
