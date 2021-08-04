import {TextAreaProps} from "../../interfaces";

const TextArea: React.FunctionComponent<TextAreaProps> = ({id, label, placeholder, value, setValue}) => {
	const cambiato = (e: any) => setValue(e.target.value);

	return (
		<div className="form-group">
			<label className="form-label" htmlFor={id}>
				{label}
			</label>
			<textarea className="form-control" id={id} placeholder={placeholder} value={value} onChange={cambiato}></textarea>
		</div>
	);
};

export default TextArea;
