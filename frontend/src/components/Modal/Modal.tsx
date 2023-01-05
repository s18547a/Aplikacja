import { ReactElement } from 'react';

function Modal(props): ReactElement {
	function handleFunction() {
		props.function();
	}

	return (
		<div
			className="modal fade"
			id={props.id}
			tabIndex={-1}
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog modal-sm" style={{ zIndex: 102 }}>
				<div className="modal-content">
					<div className="modal-header d-flex justify-content-center">
						<div className="">
							<h5 className="modal-title" id="exampleModalLabel">
								{props.label}
							</h5>
						</div>
					</div>
					<div className="modal-body">
						<div className="d-flex justify-content-center">
							<div className="me-1">
								{' '}
								<button
									type="button"
									className="btn btn-secondary"
									data-bs-dismiss="modal"
								>
									Anuluj
								</button>
							</div>
							<div className="ms-1">
								{' '}
								<button
									type="button"
									className="btn btn-primary"
									data-bs-dismiss="modal"
									onClick={handleFunction}
								>
									Potwierdź
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;
