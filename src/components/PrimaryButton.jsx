const PrimaryButton = ({
  text,
  handleOnClick,
  type = "button",
  color = "var(--primary-color)",
}) => {
  return (
    <button
      type={type}
      onClick={handleOnClick}
      className={`primary-button`}
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
