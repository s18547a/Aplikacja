import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimalMedicalInfo from '../../../classes/AnimalMedicalInfo';
import EditButton from '../../../components/Buttons/EditButton';
import ProfileDiv from '../../../components/other/ProfileDiv';
import { isManager, isVet } from '../../../components/other/userType';

function MedicalInfo({
	animalId,
	medicalInfo,
}: {
	animalId: string | undefined | null;
	medicalInfo: AnimalMedicalInfo | undefined;
}) {
	const navigate = useNavigate();

	const showBtn =
		isManager() || isVet() ? (
			<div className="row mb-1">
				<div className="col-1">
					<EditButton
						onClick={() => {
							navigate(`/animals/${animalId}/medicalInfo/edit`, {
								state: { medicalInfo: medicalInfo },
							});
						}}
					/>
				</div>
			</div>
		) : null;

	return (
		<div className="container row justify-content-center">
			<div className="col-8">
				<div className="container  border-0 ">
					<div className="row ">
						{showBtn}
						<div className="col-3">
							<div className="list-group shadow" id="list-tab" role="tablist">
								<a
									className="list-group-item list-group-item-action active"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#General"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Ogólne</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-home-list"
									data-bs-toggle="list"
									href="#Muscular"
									role="tab"
									aria-controls="list-home"
								>
									<h6>Układ mięśniowy</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-profile-list"
									data-bs-toggle="list"
									href="#Nervous"
									role="tab"
									aria-controls="list-profile"
								>
									<h6>Układ nerwowy</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-messages-list"
									data-bs-toggle="list"
									href="#Skeletal"
									role="tab"
									aria-controls="list-messages"
								>
									<h6>Układ szkieletowy</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Endocrine"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Układ hormonalny</h6>
								</a>

								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Cardiovascular"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Układ krążeniowy</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Lymphatic"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Układ limfatyczny</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Reproductive"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Układ rozrodczy</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Respiratory"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Układ oddechowy</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Digestive"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Układ trawienny</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Urinary"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Układ wydalniczy</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Optical"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Układ optyczny</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Derma"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Dermatologia</h6>
								</a>
								<a
									className="list-group-item list-group-item-action"
									id="list-settings-list"
									data-bs-toggle="list"
									href="#Other"
									role="tab"
									aria-controls="list-settings"
								>
									<h6>Inne</h6>
								</a>
							</div>
						</div>
						<div className="col-9 card card-body shadow">
							<div className="tab-content" id="nav-tabContent">
								<div
									className="tab-pane fade show active"
									id="General"
									role="tabpanel"
									aria-labelledby="list-home-list"
								>
									<table className="table table-bordered">
										<thead>
											<tr>
												<th>Informacja</th>
												<th>Stan</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Waga</td>
												<td>{medicalInfo?.Weight}</td>
											</tr>
											<tr>
												<td>Chip</td>
												<td>{medicalInfo?.Chipped == true ? 'Tak' : 'Nie'}</td>
											</tr>
											<tr>
												<td>Steryzlizacja</td>
												<td>
													{medicalInfo?.Sterilized == true ? 'Tak' : 'Nie'}
												</td>
											</tr>
										</tbody>
									</table>
								</div>

								<div
									className="tab-pane fade  "
									id="Muscular"
									role="tabpanel"
									aria-labelledby="list-home-list"
								>
									{' '}
									{medicalInfo?.Muscular}
								</div>
								<div
									className="tab-pane fade"
									id="Nervous"
									role="tabpanel"
									aria-labelledby="list-profile-list"
								>
									{medicalInfo?.Nervous}
								</div>
								<div
									className="tab-pane fade"
									id="Skeletal"
									role="tabpanel"
									aria-labelledby="list-messages-list"
								>
									{medicalInfo?.Skeletal}
								</div>
								<div
									className="tab-pane fade"
									id="Endocrine"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									{medicalInfo?.Endocrine}
								</div>
								<div
									className="tab-pane fade"
									id="Cardiovascular"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									{medicalInfo?.Cardiovascular}
								</div>
								<div
									className="tab-pane fade"
									id="Lymphatic"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									{medicalInfo?.Cardiovascular}
								</div>
								<div
									className="tab-pane fade"
									id="Reproductive"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									{medicalInfo?.Reproductive}
								</div>
								<div
									className="tab-pane fade"
									id="Respiratory"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									{medicalInfo?.Respiratory}
								</div>
								<div
									className="tab-pane fade"
									id="Digestive"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									{medicalInfo?.Digestive}
								</div>
								<div
									className="tab-pane fade"
									id="Urinary"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									{medicalInfo?.Urinary}
								</div>
								<div
									className="tab-pane fade"
									id="Optical"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									{medicalInfo?.Optical}
								</div>
								<div
									className="tab-pane fade"
									id="Derma"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									{medicalInfo?.Dermalogical}
								</div>
								<div
									className="tab-pane fade"
									id="Other"
									role="tabpanel"
									aria-labelledby="list-settings-list"
								>
									{medicalInfo?.Others}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MedicalInfo;
