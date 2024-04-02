const Modal = ({ children, show, close }) => {
  return (
    <div className={show ? "modal" : "modal hidden"}>
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
