import './form-input.styles.scss'
const FormInput = ({label, name, value, ...otherProps}) => {
  return (
    <div className={"group"}>
      <input name={name} id={name} value={value} {...otherProps}/>
      {label && <label htmlFor={name} className={`${value.length ? 'shrink' : ''} form-input-label`}>{label}: </label>}
    </div>
  );
};

export default FormInput;