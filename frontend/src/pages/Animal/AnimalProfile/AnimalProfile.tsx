import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
	getAnimalById,
	getAnimalMedicalInfo,
	getAnimalIllnesses,
	getAnimalVaccines,
	getAnimalCoreVaccines,
	setRecoveryIllness,
} from '../../../api/animalApiCalls';
import { getOwnerById } from '../../../api/ownerApiCalls';
import Animal from '../../../classes/Animal';
import AnimalMedicalInfo from '../../../classes/AnimalMedicalInfo';
import Illness from '../../../classes/Illness';
import Owner from '../../../classes/Owner';
import Vaccination from '../../../classes/Vaccination';
import VaccineType from '../../../classes/VaccineType';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentDate } from '../../../components/other/getCurrentDate';
import AnimalIllnesses from './AnimalIllnesses';
import AnimalMainInfo from './AnimalMainInfo';
import AnimalProfileNav from './AnimalProfileNav';
import AnimalVaccines from './AnimalVaccines';
import MedicalInfo from './MedicalInfo';

function AnimalProfile() {
	const [animal, setAnimal] = useState<Animal>();
	const param = useParams();

	const navigate = useNavigate();
	const location = useLocation();
	const [illnessList, setIllnessList] = useState<Illness[]>([]);
	const [owner, setOwner] = useState<Owner>();
	const [medicalInfo, setMedicalInfo] = useState<AnimalMedicalInfo>();
	const [vaccineList, setVaccineList] = useState<Vaccination[]>([]);

	useEffect(() => {
		loadAnimal();
		loadMedicalInfo();
		loadIllnesses();
		loadAnimalVaccines();
		loadAnimalCoreVaccines();
	}, []);

	const loadAnimal = async () => {
		let response;
		let promise;
		let animalOwnerId;
		if (param.AnimalId) {
			promise = getAnimalById(param.AnimalId);
			if (promise) {
				promise
					.then((data) => {
						response = data;
						return response.json();
					})
					.then(
						(data) => {
							if (response.status == 200) {
								setAnimal(data);
								animalOwnerId = data.OwnerId;
							}
							if (response.status == 404 || response.status == 500) {
							}
						},
						(error) => {
							console.log(error.message);
						}
					)
					.then(() => {
						promise = getOwnerById(animalOwnerId);
						if (promise) {
							promise
								.then((data) => {
									response = data;
									return response.json();
								})
								.then(
									(data) => {
										if (response.status == 200) {
											setOwner(data);
										}
										if (response.status == 404 || response.status == 500) {
										}
									},
									(error) => {}
								);
						}
					});
			}
		}
	};

	const loadMedicalInfo = async () => {
		let promise;
		let response;
		if (param.AnimalId) {
			promise = getAnimalMedicalInfo(param.AnimalId);

			if (promise) {
				promise
					.then((data) => {
						response = data;
						return response.json();
					})
					.then(
						(data) => {
							if (response.status == 200) {
								setMedicalInfo(data);
							} else if (response.status == 404 || response.status == 500) {
							}
						},
						(error) => {}
					);
			}
		}
	};

	const loadIllnesses = async () => {
		let promise;
		let response;
		promise = getAnimalIllnesses(param.AnimalId);
		if (promise) {
			promise
				.then((data) => {
					response = data;
					return response.json();
				})
				.then(
					(data) => {
						if (response.status == 200) {
							setIllnessList(data);
							return true;
						}
						if (response.status == 404) {
						}
						if (response.status == 500) {
						}
					},
					(error) => {}
				);
		}
	};

	const loadAnimalVaccines = async () => {
		let promise;
		let response;
		promise = getAnimalVaccines(param.AnimalId);

		if (promise) {
			promise
				.then((data) => {
					response = data;
					return data.json();
				})
				.then(
					(data) => {
						if (response.status == 200) {
							setVaccineList(data);
						}
						if (response.status == 500) {
						}
					},
					(error) => {}
				);
		}
	};

	const loadAnimalCoreVaccines = async () => {
		let promise;
		let response;
		promise = getAnimalCoreVaccines(param.AnimalId);

		if (promise) {
			promise
				.then((data) => {
					response = data;
					return data.json();
				})
				.then(
					(data) => {
						if (response.status == 200) {
							setCoreVaccinesList(data);
						}
						if (response.status == 500) {
						}
						if (response.status == 404) {
							setCoreVaccinesList([]);
						}
					},
					(error) => {}
				);
		}
	};

	const [coreVaccinesList, setCoreVaccinesList] = useState<VaccineType[]>([]);

	const [selectedTab, setSelectedTab] = useState('');

	function setSelectedTabFunction(e) {
		const { name, value } = e.target;

		setSelectedTab(value);
	}

	function updateIllness(illness) {
		illness = JSON.parse(illness);

		const illnessToUpdate = {
			AnimalId: illness.AnimalId,
			VisitId: illness.VisitId,
			Description: illness.Description,
			RecoveryDate: getCurrentDate(),
		};

		let response;
		let promise;
		promise = setRecoveryIllness(illnessToUpdate);
		if (promise) {
			promise
				.then((data) => {
					response = data;
					return response.json();
				})
				.then(
					(data) => {
						if (response.status == 201) {
							loadIllnesses();
						} else if (response.status == 500) {
						}
					},
					(error) => {}
				);
		}
	}

	const setPage = () => {
		if (selectedTab === '') {
			return <AnimalMainInfo animal={animal} owner={owner} />;
		} else if (selectedTab == 'ill') {
			return (
				<AnimalIllnesses
					illnessList={illnessList}
					updateIllness={updateIllness}
				/>
			);
		} else if (selectedTab == 'add') {
			return (
				<MedicalInfo
					animal={animal}
					medicalInfo={medicalInfo}
					animalId={animal?.AnimalId}
				/>
			);
		} else if (selectedTab == 'vacc') {
			return (
				<AnimalVaccines vaccineList={vaccineList} coreList={coreVaccinesList} />
			);
		}
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-12">
					<BreadCrumbComponent
						elements={[
							{ label: 'Zwierzęta', active: false, link: '/animals' },
							{ label: 'Profil', active: true, link: '' },
						]}
					/>
				</div>
			</div>
			<AnimalProfileNav
				setSelectedTab={setSelectedTabFunction}
				activeTab={selectedTab}
			/>
			<div className="row">
				<div className="col-12">{setPage()}</div>
			</div>
		</div>
	);
}

export default AnimalProfile;
