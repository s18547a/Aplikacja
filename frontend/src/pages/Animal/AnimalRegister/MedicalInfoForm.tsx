import { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateMedicalInfo } from '../../../apiCalls/animalApiCalls';
import AnimalMedicalInfo from '../../../classes/AnimalMedicalInfo';
import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import FormCheck from '../../../components/Form/FormCheck';
import FormDiv from '../../../components/Form/FormDiv';
import FormTextField from '../../../components/Form/FormTextField';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';

function MedicalInfoForm(): ReactElement {
	const [medicalInfo, setMedicalInfo] = useState<AnimalMedicalInfo>({
		AnimalId: '',
		Chipped: null,
		Sterilized: null,
		Skeletal: '',
		Muscular: '',
		Nervous: '',
		Endocrine: '',
		Cardiovascular: '',
		Lymphatic: '',
		Respiratory: '',
		Digestive: '',
		Urinary: '',
		Reproductive: '',
		Optical: '',
		Dental: '',
		Dermalogical: '',
		Others: '',
		Weight: null,
	});
	const location = useLocation();
	const navigate = useNavigate();
	const [serverError, setServerError] = useState<boolean>(false);

	useEffect(() => {
		const state = location.state as { medicalInfo: AnimalMedicalInfo };
		console.log(state);
		if (state) {
			setMedicalInfo(state.medicalInfo);
		}
	}, []);

	function handleSubmit(e): void {
		e.preventDefault();
		console.log(medicalInfo);

		const promise = updateMedicalInfo(medicalInfo);

		if (promise) {
			let response;
			promise
				.then((data) => {
					response = data;
					return response.json();
				})
				.then(
					(data) => {
						if (response.status == 201) {
							navigate(`/animals/${medicalInfo.AnimalId}`);
						}
						if (response.satus == 500) {
							setServerError(true);
						}
					},
					(error) => {
						console.log(error);
						setServerError(true);
					}
				);
		}
	}
	function handleChange(e): void {
		let { name, value } = e.target;

		if (name == 'Sterilized' || name == 'Chipped') {
			if (value == '0') {
				value = 0;
			}
			if (value == '1') {
				value = 1;
			}
		}
		setMedicalInfo((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	return (
		<div className=" container">
			<ServerErrorInfoComponenet serverError={serverError} />
			<BreadCrumbComponent
				elements={[
					{ label: 'Zwierzęta', active: false, link: '/animals' },
					{
						label: 'Profil',
						active: false,
						link: `/animals/${medicalInfo.AnimalId}`,
					},

					{ label: 'Edycja zdrowia', active: true, link: '' },
				]}
			/>
			<form className=" row justify-content-center" onSubmit={handleSubmit}>
				<div className="col-8">
					<div className="container  border-0 ">
						<div className="row ">
							<div className="row mb-1">
								<div className="col-1">
									<SubmitFormButton type="submit" label={'Zapisz'} />
								</div>
							</div>
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
										<div className="row">
											<div className="col-3">
												<FormDiv
													label="Waga"
													onChange={handleChange}
													type="number"
													value={medicalInfo?.Weight}
													name="Weight"
												/>
											</div>
										</div>
										<div className="row">
											<div className="col-3">
												<FormCheck
													label="Sterylizacja"
													name="Sterilized"
													onChange={handleChange}
													selected={medicalInfo?.Sterilized}
													elements={[
														{
															value: 1,
															id: 'yesS',
															label: 'Tak',
														},

														{
															value: 0,
															id: 'noS',
															label: 'Nie',
														},
													]}
												/>
											</div>
											<div className="row">
												<div className="col-3">
													<FormCheck
														label="Chip"
														name="Chipped"
														onChange={handleChange}
														selected={medicalInfo?.Chipped}
														elements={[
															{
																value: 1,
																id: 'yesC',
																label: 'Tak',
															},

															{
																value: 0,
																id: 'noC',
																label: 'Nie',
															},
														]}
													/>
												</div>
											</div>
										</div>
									</div>

									<div
										className="tab-pane fade  "
										id="Muscular"
										role="tabpanel"
										aria-labelledby="list-home-list"
									>
										<FormTextField
											label={'Układ mięśniowy'}
											name="Muscular"
											value={medicalInfo?.Muscular}
											onChange={handleChange}
										/>
									</div>
									<div
										className="tab-pane fade"
										id="Nervous"
										role="tabpanel"
										aria-labelledby="list-profile-list"
									>
										<FormTextField
											label={'Układ nerwowy'}
											name="Nervous"
											value={medicalInfo?.Nervous}
											onChange={handleChange}
										/>
									</div>
									<div
										className="tab-pane fade"
										id="Skeletal"
										role="tabpanel"
										aria-labelledby="list-messages-list"
									>
										<FormTextField
											label={'Układ kostny'}
											name="Skeletal"
											value={medicalInfo?.Skeletal}
											onChange={handleChange}
										/>
									</div>
									<div
										className="tab-pane fade"
										id="Endocrine"
										role="tabpanel"
										aria-labelledby="list-settings-list"
									>
										<FormTextField
											label={'Układ hormonalny'}
											name="Endocrine"
											value={medicalInfo?.Endocrine}
											onChange={handleChange}
										/>
									</div>
									<div
										className="tab-pane fade"
										id="Cardiovascular"
										role="tabpanel"
										aria-labelledby="list-settings-list"
									>
										<FormTextField
											label={'Układ krążeniowy'}
											name="Cardiovascular"
											value={medicalInfo?.Cardiovascular}
											onChange={handleChange}
										/>
									</div>
									<div
										className="tab-pane fade"
										id="Lymphatic"
										role="tabpanel"
										aria-labelledby="list-settings-list"
									>
										<FormTextField
											label={'Układ limfatyczny'}
											name="Lymphatic"
											value={medicalInfo?.Lymphatic}
											onChange={handleChange}
										/>
									</div>
									<div
										className="tab-pane fade"
										id="Reproductive"
										role="tabpanel"
										aria-labelledby="list-settings-list"
									>
										<FormTextField
											label={'Układ rozrodczy'}
											name="Reproductive"
											value={medicalInfo?.Reproductive}
											onChange={handleChange}
										/>
									</div>
									<div
										className="tab-pane fade"
										id="Respiratory"
										role="tabpanel"
										aria-labelledby="list-settings-list"
									>
										<FormTextField
											label={'Układ oddechowy'}
											name="Respiratory"
											value={medicalInfo?.Respiratory}
											onChange={handleChange}
										/>
									</div>
									<div
										className="tab-pane fade"
										id="Digestive"
										role="tabpanel"
										aria-labelledby="list-settings-list"
									>
										<FormTextField
											label={'Układ trawienny'}
											name="Digestive"
											value={medicalInfo?.Digestive}
											onChange={handleChange}
										/>
									</div>
									<div
										className="tab-pane fade"
										id="Urinary"
										role="tabpanel"
										aria-labelledby="list-settings-list"
									>
										<FormTextField
											label={'Układ wydalniczy'}
											name="Urinary"
											value={medicalInfo?.Urinary}
											onChange={handleChange}
										/>
									</div>
									<div
										className="tab-pane fade"
										id="Optical"
										role="tabpanel"
										aria-labelledby="list-settings-list"
									>
										<FormTextField
											label={'Optyka'}
											name="Optical"
											value={medicalInfo?.Optical}
											onChange={handleChange}
										/>
									</div>
									<div
										className="tab-pane fade"
										id="Derma"
										role="tabpanel"
										aria-labelledby="list-settings-list"
									>
										<FormTextField
											label={'Dermatologia'}
											name="Dermatological"
											value={medicalInfo?.Dermalogical}
											onChange={handleChange}
										/>
									</div>
									<div
										className="tab-pane fade"
										id="Other"
										role="tabpanel"
										aria-labelledby="list-settings-list"
									>
										<FormTextField
											label={'Inne'}
											name="Others"
											value={medicalInfo?.Others}
											onChange={handleChange}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}
export default MedicalInfoForm;
