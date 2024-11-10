import './button.css';

type ButtonProps = {
  onClick: () => void;
  children: JSX.Element | string;
};
const Button = ({ onClick, children }: ButtonProps): JSX.Element => {
  return (
    <button onClick={onClick} className="button-primary">
      {children}
    </button>
  );
};

export default Button;
