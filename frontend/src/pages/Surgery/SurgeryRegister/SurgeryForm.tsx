import { ReactElement, useEffect, useState } from 'react';

import SelectOwnerComponent from '../../../components/Form/SelectOwnerComponent';
import SelectAnimalComponent from '../../../components/Form/SelectAnimalComponent';
import VetChoiceComponent from '../../../components/Form/VetChoiceComponent';

import 'react-datepicker/dist/react-datepicker.css';
import pl from 'date-fns/locale/pl';
import { useNavigate } from 'react-router-dom';
import {
	getSurgeryTypes,
	registerSurgery,
} from '../../../apiCalls/surgeryApiCalls';
import {
	getVetBySurgeryType,
	getVetDaysOfWeek,
	getValiableHourForSurgery,
} from '../../../apiCalls/vetApiCalls';
import Animal from '../../../classes/Animal';
import SurgeryType from '../../../classes/SurgeryType';
import Vet from '../../../classes/Vet';
import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import FormDateReactDiv from '../../../components/Form/FormDateRectDiv';
import FormSelectLimit from '../../../components/Form/FormSelectLimit';
import FormTextField from '../../../components/Form/FormTextField';
import ProfileDiv from '../../../components/Profile/ProfileDiv';

import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentDate } from '../../../utils/getCurrentDate';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';
import { checkIfAllFieldAsFilled } from '../../../utils/validatiorHelper';

interface ISurgeryForm {
	OwnerId: string;
	Date: string;
	SurgeryType: string;
	LeadVetId: string;

	AnimalId: string;

	Description: string | null;
	StartTime: string;
}
function SurgeryForm(): ReactElement {
	const [surgeryTypes, setSurgeryTypes] = useState<SurgeryType[]>([]);

	const [animalList, setAnimalList] = useState<Animal[]>([]);
	const [surgery, setSurgery] = useState<ISurgeryForm>({
		OwnerId: '',
		Date: '',
		SurgeryType: '',
		LeadVetId: '',

		AnimalId: '',

		Description: '',
		StartTime: '',
	});
	const [error, setError] = useState<{
		OwnerId: string;
		Date: string;
		SurgeryType: string;
		LeadVetId: string;
		AnimalId: string;

		Description: string;
		StartTime: string;
	}>({
		Date: '',
		SurgeryType: '',
		LeadVetId: '',

		AnimalId: '',
		OwnerId: '',
		StartTime: '',
		Description: '',
	});
	const [vets, setVets] = useState<Vet[]>([]);
	const [availableHours, setAvailableHours] = useState<string[]>([]);
	const [serverError, setServerError] = useState(false);

	useEffect(() => {
		getTypesFromApi();
	}, []);

	const getTypesFromApi = (): void => {
		let results;
		let promise = getSurgeryTypes();
		if (promise) {
			promise
				.then((res) => {
					results = res;
					return res.json();
				})
				.then(
					(data) => {
						if (results.status == 200) {
							setSurgeryTypes(data);
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
	};
	function onChangeOwner(e) {
		e.preventDefault();
		setAnimalList([]);
		setError((prev) => ({
			...prev,
			AnimalId: '',
		}));
		const { name, value } = e.target;
		setSurgery((prev) => ({
			...prev,
			OwnerId: value,
		}));
	}

	function onChange(e) {
		const { name, value } = e.target;

		setSurgery((prev) => ({
			...prev,
			[name]: value,
		}));
	}
	const [surgeryPriece, setSurgeryPriece] = useState(0);

	function onChangeType(e) {
		const { name, value } = e.target;
		setVets([]);
		setAvailableHours([]);

		setSurgery((prev) => ({
			...prev,
			[name]: value,
			LeadVetId: '',
			Date: '',
		}));
		const selectedTypePriece = surgeryTypes.filter((x) => {
			return x.SurgeryType == value;
		})[0].Price;
		console.log(surgeryTypes);
		setSurgeryPriece(selectedTypePriece);
		setavailableDaysList([]);
		setavailableDaysListError('');

		let results;
		getVetBySurgeryType(value)
			.then((res) => {
				results = res;
				return res.json();
			})
			.then(
				(data) => {
					if (results.status == 200) {
						setVets(data);
					}
					if (results.status == 500) {
						setServerError(true);
					}
				},
				(error) => {
					setServerError(true);
					return error;
				}
			);
	}
	const [availableDayList, setavailableDaysList] = useState<String[]>([]);
	const [availableDayListError, setavailableDaysListError] = useState('');
	function onChangeVet(e) {
		const { name, value } = e.target;
		setError((prev) => ({
			...prev,
			StartTime: '',
		}));
		setAvailableHours([]);
		setSurgery((prev) => ({
			...prev,
			LeadVetId: value,
			Date: '',
		}));

		let response;
		let promise;
		promise = getVetDaysOfWeek(value);
		if (promise) {
			promise
				.then((data) => {
					response = data;
					return data.json();
				})
				.then(
					(data) => {
						if (response.status == 200) {
							setavailableDaysList(data);
							console.log(data);
						}
						if (response.status == 404) {
							setavailableDaysListError('Weterynarz nie przyjmuje');
							console.log(404);
						} else {
							setServerError(true);
						}
					},
					(error) => {
						setServerError(true);
					}
				);
		}
	}

	const navigate = useNavigate();
	function handleHourChange(e) {
		setError((prev) => ({
			...prev,
			StartTime: '',
		}));
		const { name, value } = e.target;
		setSurgery((prev) => ({
			...prev,
			StartTime: value,
		}));
	}
	function handleSubmit(e) {
		e.preventDefault();

		console.log(surgery);
		if (validateForm()) {
			console.log(surgery);

			let response;
			registerSurgery(surgery)
				.then((data) => {
					response = data;
					return data.json();
				})
				.then(
					(data) => {
						if (response.status == 201) {
							navigate('/surgeries', { state: { id: data.newId } });
						} else {
							console.log(error);
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

		for (const [name, value] of Object.entries(surgery)) {
			error[name] = '';

			if (value === '' || value == undefined || value == null) {
				setError((prevErrors) => ({
					...prevErrors,
					[name]: 'Puste pole',
				}));

				isValid = false;
			}
		}
		return isValid;
	}
	function setAPIError(value: any, errorField: any) {
		setError((prev) => ({
			...prev,
			[errorField]: value,
		}));
	}

	function handleReactDatePicker(e) {
		const date: String = e;
		console.log(e);
		setSurgery((prev) => ({
			...prev,
			Date: date.toString(),
			StartTime: '',
		}));
		setAvailableHours([]);
		setError((prev) => ({
			...prev,
			StartTime: '',
		}));

		console.log(date);
		let promise;
		promise = getValiableHourForSurgery(date, surgery.LeadVetId);
		if (promise) {
			let results;
			promise
				.then((data) => {
					results = data;
					return data.json();
				})
				.then(
					(data) => {
						console.log(data);
						if (results.status == 200) {
							setAvailableHours(data);
						} else if (results.status == 404) {
							setError((prev) => ({
								...prev,
								StartTime: 'Brak wyników',
							}));
						} else {
							setServerError(true);
						}
					},
					(error) => {
						setServerError(true);
					}
				);
		}
	}

	const filterDate = (e) => {
		const day = new Date(e).toLocaleDateString('en-EN', { weekday: 'long' });

		return availableDayList.includes(day);
	};

	const setServerErrorChild = () => {
		setServerError(true);
	};

	return (
		<form className="container " onSubmit={handleSubmit}>
			<ServerErrorInfoComponenet serverError={serverError} />
			<div className="row">
				<div className="col-6">
					<BreadCrumbComponent
						elements={[
							{ label: 'Zabiegi', active: false, link: '/surgeries' },
							{
								label: 'Rezerwacja',
								active: true,
								link: '',
							},
						]}
					/>
				</div>
			</div>
			<div className="row justify-content-center">
				<div className=" col-4 ">
					<div className="card card-body shadow">
						<SelectOwnerComponent
							onChange={onChangeOwner}
							error={error.OwnerId}
							setServerError={setServerErrorChild}
							selectedValue={surgery.OwnerId}
							editForm={false}
						/>

						<SelectAnimalComponent
							onChange={onChange}
							error={error.AnimalId}
							OwnerId={surgery.OwnerId}
							setServerError={setServerErrorChild}
						/>

						<FormSelectLimit
							label="Kategoria"
							name="SurgeryType"
							onChange={onChangeType}
							array={surgeryTypes}
							id={'SurgeryType'}
							elementLabel="SurgeryType"
							error={error.SurgeryType}
							arrayIsObjectList={true}
						/>

						<ProfileDiv label="Cena:" value={`${surgeryPriece} zł`} />

						<VetChoiceComponent
							label={'Prowadzący'}
							selected={surgery.LeadVetId}
							onChange={onChangeVet}
							vets={vets}
						/>

						{surgery.LeadVetId && (
							<FormDateReactDiv
								label="Termin"
								onChange={handleReactDatePicker}
								filter={filterDate}
								locale={pl}
								name="date"
								selected={surgery.Date == '' ? null : new Date(surgery.Date)}
								dateFormat="yyyy-MM-dd"
								error={error.Date}
								disabled={surgery.LeadVetId == ''}
								min={new Date(getCurrentDate())}
							/>
						)}

						{surgery.Date && (
							<FormSelectLimit
								label="Godzina"
								name="StartTime"
								onChange={handleHourChange}
								array={availableHours}
								id={'element'}
								elementLabel={'element'}
								error={error.StartTime}
								arrayIsObjectList={false}
								selectedValue={''}
								selected={false}
							/>
						)}

						<FormTextField
							label="Opis"
							name={'Description'}
							onChange={onChange}
							error={error.Description}
						/>
						{checkIfAllFieldAsFilled(surgery) && (
							<div className="col-12">
								<SubmitFormButton label={'Zarezerwuj'} />
							</div>
						)}
					</div>
				</div>
			</div>
		</form>
	);
}

export default SurgeryForm;
