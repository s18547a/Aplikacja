import { ReactElement } from 'react';
import { DoorClosed } from 'react-bootstrap-icons';

function ModalEnableBtn(props): ReactElement {
	return (
		<button
			className={`${props.className} d-flex align-items-center`}
			type="button"
			data-bs-toggle="modal"
			data-bs-target={`#${props.id}`}
			onClick={props.onClick}
			value={props.value}
		>
			{props.icon}
			{props.label}
		</button>
	);
}

export default ModalEnableBtn;
