import { ReactElement } from 'react';

import Vet from '../../classes/Vet';
import { spaceContact } from '../../utils/contactHelper';
import { getDefalutProfileImage } from '../../utils/imageHelper';

function VetChoiceComponent({
	handleVetChange,
	vets,
	selected,
	error,
}: {
	handleVetChange: (any) => void;
	vets: Vet[];
	selected: string | undefined;
	error: string;
}): ReactElement {
	function handleVetChangeFunction(e) {
		handleVetChange(e);
	}

	return (
		<div className="row">
			<div className=" form-group">
				<div className=" form-label">Weterynarz</div>

				<div className=" row">
					{vets.map((vet) => {
						return (
							<div className="col-6">
								<div
									className={selected == vet.VetId ? ' card ' : ' card '}
									onClick={handleVetChangeFunction}
								>
									<img
										height={'150px'}
										src={
											vet.ProfileImage == null
												? getDefalutProfileImage()
												: vet.ProfileImage
										}
										className=" card-img-top"
									/>

									<div className=" card-body">
										<div className=" card-title d-flex">
											<h6 className="">{vet.Name + ' ' + vet.LastName}</h6>
										</div>
									</div>
									<ul className=" list-group list-group-flush">
										<li className="list-group-item">{`tel. ${spaceContact(
											vet.Contact
										)}`}</li>
										<li className="list-group-item ">
											<div className="row">
												{vet.VetId !== selected && (
													<button
														name={'VetId'}
														value={vet.VetId}
														onClick={handleVetChangeFunction}
														className=" btn btn-primary"
													>
														Wybierz
													</button>
												)}
												{vet.VetId === selected && (
													<button className=" btn btn-success">Wybrano</button>
												)}
											</div>
										</li>
									</ul>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default VetChoiceComponent;
