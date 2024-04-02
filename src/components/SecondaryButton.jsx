const SecondaryButton = ({
  handleOnClick,
  type = "button",
  color = "var(--primary-color)",
  children,
}) => {
  return (
    <button
      type={type}
      onClick={handleOnClick}
      className="secondary-button"
      style={{ color: color }}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
