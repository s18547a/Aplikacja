import {
	ReactComponentElement,
	ReactElement,
	useEffect,
	useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAnimalUnadminstratedVaccines } from '../../../apiCalls/animalApiCalls';
import {
	getMedicalAtivities,
	registerVisit,
} from '../../../apiCalls/visitApiCalls';
import Animal from '../../../classes/Animal';
import MedicalActivity from '../../../classes/MedicalActivity';
import VaccineType from '../../../classes/VaccineType';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentUser } from '../../../utils/authHelper';
import { errorAPIHandler } from '../../../utils/errorAPIHelper';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';
import DiagnosisForm from './DiagnosisForm';
import VisitActivitiesForm from './VisitActivitesForm';
import VisitMainInfoForm from './VisitMainInfoForm';
import VisitVaccineForm from './VisitVaccineForm';

export interface IVisitForm {
	Date: string;
	VetId: string;
	OwnerId: string;
	AnimalId: string;
	Hour: string;
	Note: string | null;
	Bill: number;
	MedicalActivities: number[];
	DiagnosisList: [];
	VaccineList: string[];
	ReservationId: string;
}
export interface IVisitError {
	Date: string;
	VetId: string;
	OwnerId: string;
	AnimalId: string;
	Hour: string;
	Note: string | null;
}
function VisitForm(): ReactElement {
	const [serverError, setServerError] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const [visit, setVisit] = useState<IVisitForm>({
		Date: '',
		VetId: getCurrentUser().userId,
		OwnerId: '',
		AnimalId: '',
		Hour: '',
		Note: null,
		Bill: 0,
		MedicalActivities: [],
		DiagnosisList: [],
		VaccineList: [],
		ReservationId: '',
	});

	const [medicalActivities, setMedicalActivities] = useState<MedicalActivity[]>(
		[]
	);

	const [animalList, setAnimalList] = useState<Animal[]>([]);

	const [error, setError] = useState<IVisitError>({
		Date: '',
		VetId: '',
		AnimalId: '',
		Hour: '',
		Note: '',
		OwnerId: '',
	});

	useEffect(() => {
		let promise;
		let response;
		promise = getMedicalAtivities();
		if (promise) {
			promise
				.then((data) => {
					response = data;
					return response.json();
				})
				.then(
					(data) => {
						if (response.status == 200) {
							setMedicalActivities(data);
						}
						if (response.status == 500) {
							setServerError(true);
						}
					},
					(error) => {
						setServerError(true);
						console.log(error);
					}
				);
		}
		const state = location.state as {
			ReservationId: string;
			Date: string;
			Hour: string;
			OwnerId: string;
		};
		if (state) {
			setReservedId(state.ReservationId);
			setRealised(true);
			setVisit((prev) => ({
				...prev,
				Date: state.Date,
				Hour: state.Hour,
				OwnerId: state.OwnerId,
			}));
		}
	}, []);
	const [realised, setRealised] = useState<boolean>(false);
	const [reservedId, setReservedId] = useState('');

	function onChange(e) {
		const { name, value } = e.target;
		if (name == 'AnimalId' || name == 'OwnerId') {
			setVisit((prev) => ({
				...prev,
				MedicalActivities: [],
				Bill: 0,
				VaccineList: [],
				DiagnosisList: [],
			}));
		}
		setVisit((prev) => ({
			...prev,
			[name]: value,
		}));
		console.log(visit);
	}

	function onChangeOwner(e) {
		setAnimalList([]);
		setError((prev) => ({
			...prev,
			AnimalId: '',
		}));

		const value = e.value;
		setVisit((prev) => ({
			...prev,
			OwnerId: value,
			AnimalId: '',
		}));
	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log(visit);
		if (validateForm()) {
			let result;

			const newVisit = visit;
			newVisit.ReservationId = reservedId;
			console.log(newVisit);
			registerVisit(newVisit)
				.then((res) => {
					result = res;
					return res.json();
				})
				.then(
					(data) => {
						if (result.status == 201) {
							navigate('/visits', { state: { id: data.newId } });
						}
						if (result.status == 500) {
							setServerError(true);
						}
					},
					(error) => {
						setServerError(true);
						console.log(error);
					}
				);
		}
	}

	function validateForm() {
		let isValid = true;

		for (const [name, value] of Object.entries(visit)) {
			error[name] = '';

			if (name != 'ReservationId') {
				if (name != 'Note' && (value === '' || value == null)) {
					setError((prevErrors) => ({
						...prevErrors,
						[name]: 'Puste pole',
					}));
					isValid = false;
				}
				if (name == 'Hour' && value != '' && value != null) {
					const regex = '[0-2][0-9]:[0-5][0-9]';
					const match = value.match(regex);
					if (match == null) {
						setError((prevErrors) => ({
							...prevErrors,
							[name]: 'Niepoprawny format',
						}));
						isValid = false;
					} else {
						const hourArray = value.split(':');

						if (hourArray[1] > 59 || hourArray[0] > 23) {
							setError((prevErrors) => ({
								...prevErrors,
								[name]: 'Niepoprawny format',
							}));
							isValid = false;
						}
					}
				}
			}
		}
		return isValid;
	}

	function setDiagnosisList(value) {
		setVisit((prev) => ({
			...prev,
			DiagnosisList: value,
		}));
	}

	function changeActivity(e) {
		const { name, value } = e.target;

		console.log(value);

		if (!visit.MedicalActivities.includes(value)) {
			for (const [nameMedAct, medAct] of Object.entries(medicalActivities)) {
				if (medAct.MedicalActivityId == value) {
					const newBill = visit.Bill + medAct.Price;

					visit['Bill'] = newBill;
					const newMedicalActivites = visit.MedicalActivities.map((x) => x);
					newMedicalActivites.push(value);
					setVisit((prev) => ({
						...prev,
						MedicalActivities: newMedicalActivites,
					}));
				}
			}
		} else {
			for (const [nameMedAct, medAct] of Object.entries(medicalActivities)) {
				if (medAct.MedicalActivityId == value) {
					const newBill = visit.Bill - medAct.Price;

					visit['Bill'] = newBill;
					let newMedicalActivites = visit.MedicalActivities.map((x) => x);
					newMedicalActivites = newMedicalActivites.filter((arrval) => {
						if (arrval != value) {
							return true;
						}
					});
					setVisit((prev) => ({
						...prev,
						MedicalActivities: newMedicalActivites,
					}));
				}
			}
		}
	}

	function changeVaccine(e) {
		const { name, value } = e.target;
		console.log(value);
		console.log(visit.VaccineList);

		let vacList = visit.VaccineList;
		if (!vacList.includes(value)) {
			vacList.push(value);
		} else {
			vacList = vacList.filter((vac) => {
				return !(value != vac);
			});
		}

		setVisit((prev) => ({
			...prev,
			VaccineList: vacList,
		}));
	}

	const setServerErrorChild = () => {
		setServerError(true);
	};
	const [vaccineList, setVaccineList] = useState<VaccineType[]>([]);

	async function getAnimalUnadminstratedVaccinesApiCall(AnimalId) {
		if (visit.AnimalId) {
			let results;
			getAnimalUnadminstratedVaccines(AnimalId)
				.then((data) => {
					results = data;

					return data.json();
				})
				.then(
					(data) => {
						if (results.status == 200) {
							setVaccineList(data);
						}
						if (results.status == 404) {
							setVaccineList([]);
						}
						if (results.status == 500) {
							setServerError(true);
						}
					},
					(error) => {
						setServerError(true);
					}
				);
		}
	}
	useEffect(() => {
		getAnimalUnadminstratedVaccinesApiCall(visit.AnimalId);
	}, [visit.AnimalId]);

	return (
		<form className=" container " onSubmit={handleSubmit}>
			<ServerErrorInfoComponenet serverError={serverError} />
			<div className="row">
				<div className="col-6">
					<BreadCrumbComponent
						elements={[
							{ label: 'Wizyty', active: false, link: '/visits' },
							{
								label: 'Rejestracja',
								active: true,
								link: '',
							},
						]}
					/>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className="col-lg-6">
					<div className="row justify-content-center">
						<div className="col-8">
							<VisitMainInfoForm
								onChange={onChange}
								onChangeOwner={onChangeOwner}
								error={error}
								visit={visit}
								editForm={realised}
								setServerError={setServerErrorChild}
								realised={realised}
							/>
						</div>
					</div>
				</div>
				<div className="col-lg-4">
					<div className="row">
						<div className="col-12 mb-4">
							<VisitActivitiesForm
								changeActivity={changeActivity}
								medicalActivities={medicalActivities}
								AnimalId={visit.AnimalId}
							/>
						</div>
						<div className="col-12">
							<VisitVaccineForm
								AnimalId={visit.AnimalId}
								onChange={changeVaccine}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<DiagnosisForm
								setDiagnosisList={setDiagnosisList}
								AnimalId={visit.AnimalId}
							/>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}

export default VisitForm;
