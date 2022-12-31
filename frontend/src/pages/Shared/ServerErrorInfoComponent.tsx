import { ReactElement } from 'react';
import { XCircle } from 'react-bootstrap-icons';

function ServerErrorInfoComponenet({
	serverError,
}: {
	serverError: boolean;
}): ReactElement {
	return (
		<div className="row">
			<div className="col-12">
				<div>
					{serverError === true ? (
						<div className="alert alert-danger ">
							<div className=" d-flex ">
								<div className="me-2">
									<XCircle />
								</div>
								<div className="">Błąd serwera</div>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default ServerErrorInfoComponenet;
