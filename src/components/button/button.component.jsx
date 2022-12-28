import './button.styles.scss'
const Button = ({children, onClickHandler=()=>{}, extraClassName='', submit=false}) => {
  return (
    <button type={submit?"submit":"button"} onClick={onClickHandler} className={`button-container ${extraClassName}`}>
      {children}
    </button>
  );
};

export default Button;