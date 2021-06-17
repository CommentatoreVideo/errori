export interface DataProps {
	id?: string;
	data: string;
	setData: (data: string) => any;
	placeholder: string;
	label: string;
}

const Data: React.FunctionComponent<DataProps> = ({
	id,
	data,
	setData,
	placeholder,
	label,
}) => {
	function cambiato(e: any) {
		setData(e.target.value);
	}
	return (
		<div className="form-group">
			<label htmlFor={id}>{label}</label>
			<input
				className="form-control"
				type="date"
				id={id}
				value={data}
				onChange={cambiato}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default Data;
