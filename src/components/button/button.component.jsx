import './button.styles.scss'
const Button = ({
                  children,
                  onClickHandler = () => {},
                  extraClassName = '',
                  submit = false,
                  disablePredicate = false
                }) => {
  return (
    <button type={submit ? "submit" : "button"} onClick={onClickHandler}
            className={`button-container ${extraClassName}`} disabled={disablePredicate}>
      {children}
    </button>
  );
};

export default Button;