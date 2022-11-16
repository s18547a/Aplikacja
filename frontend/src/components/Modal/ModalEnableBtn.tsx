function ModalEnableBtn(props) {
  return (
    <button
      className={props.className}
      type="button"
      data-bs-toggle="modal"
      data-bs-target={`#${props.id}`}
      onClick={props.onClick}
      value={props.value}
    >
      {props.label}
    </button>
  );
}

export default ModalEnableBtn;
