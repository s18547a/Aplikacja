import { ReactElement } from 'react';
import { ExclamationCircle } from 'react-bootstrap-icons';

function ServerErrorInfoBannerComponenet({
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
									<ExclamationCircle />
								</div>
								<div className="">| Błąd serwera</div>
							</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default ServerErrorInfoBannerComponenet;
