import { ReactElement } from 'react';

function SubmitFormButton(props): ReactElement {
	return (
		<div className="row">
			<div className="col-3 ">
				<button
					type="submit"
					className="btn btn-primary"
					style={{ background: 'green' }}
				>
					{props.label}
				</button>
			</div>
		</div>
	);
}

export default SubmitFormButton;
