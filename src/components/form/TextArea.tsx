export interface TextAreaProps {
  id?:string;
  label:string;
  placeholder:string;
  value:string;
  setValue:(value:string)=>void
}
 
const TextArea: React.FunctionComponent<TextAreaProps> = ({id,label,placeholder,value,setValue}) => {
  function cambiato(e:any) {
    setValue(e.target.value);
  }
  return ( 
    <div className="form-group">
      <label className="form-label" htmlFor={id}>{label}</label>
      <textarea className="form-control" id={id} placeholder={placeholder} value={value} onChange={cambiato}></textarea>
    </div>
   );
   
}
 
export default TextArea;