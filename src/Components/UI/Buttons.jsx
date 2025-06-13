/* eslint-disable react/prop-types */
// import "../../styles/UI/Buttons.css";
export const SSButton = ({ name, className, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`SSButton ${className}`}
    >
      {name}
    </button>
  );
};
export const SSButtonShadow = ({ name, className, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`SSButtonShadow ${className}`}
      
    >
      {name}
    </button>
  );
};

export const SSButtonWithIcon = ({
  name,
  className,
  onClick,
  disabled,
  icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`SSButtonWithIcon ${className}`}
    >
      {name}
      {icon && icon}
    </button>
  );
};
export const SastaButton = ({ name, className, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`SastaButton ${className}`}
    >
      {name}
    </button>
  );
};
