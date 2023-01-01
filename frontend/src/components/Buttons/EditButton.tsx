import { ReactElement } from 'react';
import { Gear } from 'react-bootstrap-icons';

function EditButton({ onClick }): ReactElement {
	return (
		<button
			className="btn btn-info btn-sm text-white d-flex align-items-center"
			onClick={onClick}
		>
			<Gear className="me-2" />
			<a>Edytuj</a>
		</button>
	);
}

export default EditButton;
