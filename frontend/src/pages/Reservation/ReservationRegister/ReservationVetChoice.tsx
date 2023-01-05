import { ReactElement } from 'react';

import Vet from '../../../classes/Vet';
import { spaceContact } from '../../../utils/contactHelper';
import { getDefalutProfileImage } from '../../../utils/imageHelper';
import { IReservationForm } from './ReservationForm';

function ReservationVetChoice({
	handleVetChange,
	vets,
	reservation,
	error,
}: {
	handleVetChange: (any) => void;
	vets: Vet[];
	reservation: IReservationForm;
	error: string;
}): ReactElement {
	function handleVetChangeFunction(e) {
		handleVetChange(e);
	}

	return (
		<div className="form-group">
			<div className="form-label ">Weterynarz</div>

			<div className="list-group">
				<div className="row">
					{vets.map((vet) => {
						return (
							<div className="col-6">
								<button
									name={'VetId'}
									value={vet.VetId}
									className={
										reservation.VetId == vet.VetId
											? 'list-group-item active stretched-link m-2 border-1'
											: 'list-group-item stretched-link m-2 border-1'
									}
									onClick={handleVetChangeFunction}
								>
									<div className="row p-3">
										<div className="col-12">
											<img
												width={'100px'}
												height={'100px'}
												src={
													vet.ProfileImage == null
														? getDefalutProfileImage()
														: vet.ProfileImage
												}
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-12 ">
											<div className="d-flex flex-column">
												<div className=" p-3">
													{vet.Name + ' ' + vet.LastName}
												</div>

												<div className="">{`tel. ${spaceContact(
													vet.Contact
												)}`}</div>
											</div>
										</div>
									</div>
								</button>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default ReservationVetChoice;
