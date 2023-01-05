import { useState, useEffect, ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
	getAnimalTypes,
	getAnimalById,
	updateAnimal,
	registerAnimal,
} from '../../../apiCalls/animalApiCalls';
import { getOwners } from '../../../apiCalls/ownerApiCalls';
import AnimalType from '../../../classes/AnimalType';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentUser } from '../../../utils/authHelper';
import { isOwner, isVet, isManager } from '../../../utils/userType';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';
import PhotoForm from '../../../components/Form/PhotoForm';
import AnimalMainInfo from './AnimalMainInfo';
import { Sex } from '../../../classes/Animal';

export interface IAnimalForm {
	Name: undefined;
	BirthDate: undefined;

	OwnerId: undefined;
	Sex: undefined;

	AnimalTypeId: undefined;
	ProfileImage: undefined | null | any;
}

function AnimalRegister(): ReactElement {
	const [animalTypes, setAnimalTypes] = useState<AnimalType[]>([]);
	const location = useLocation();

	const [editForm, setEditForm] = useState(false);
	const [ownerList, setOwnerList] = useState([]);
	const [animalId, setAnimalId] = useState('');

	const [animal, setAnimal] = useState<IAnimalForm>({
		Name: undefined,
		BirthDate: undefined,

		OwnerId: undefined,
		Sex: undefined,

		AnimalTypeId: undefined,
		ProfileImage: null,
	});

	const [error, setError] = useState<{
		Name: string;
		BirthDate: string;
		Weight: string;
		AnimalTypeId: string;
		Sex: string;
		OwnerId: string;
	}>({
		Name: '',
		BirthDate: '',
		Weight: '',
		AnimalTypeId: '',
		Sex: '',
		OwnerId: '',
	});

	const [serverError, setServerError] = useState(false);

	let navigate = useNavigate();

	useEffect(() => {
		if (isOwner()) {
			setAnimal((prev) => ({
				...prev,
				OwnerId: getCurrentUser().userTypeId,
			}));
		}
		let response;
		let promise;

		promise = getAnimalTypes();
		if (promise) {
			promise
				.then((data) => {
					response = data;

					return response.json();
				})
				.then(
					(data) => {
						if (response.status == 500) {
							setServerError(true);
						}
						if (response.status == 200) {
							setAnimalTypes(data);
						}
					},
					(error) => {
						console.log(error);
					}
				);
		}

		if (isVet() || isManager()) {
			promise = getOwners();
			if (promise) {
				promise
					.then((data) => {
						response = data;
						return response.json();
					})
					.then(
						(data) => {
							if (response.status == 200) {
								setOwnerList(data);
							}
							if (response.status == 500) {
								setServerError(true);
							}
						},
						(error) => {
							setServerError(true);
						}
					);
			}
		}

		const state = location.state as { AnimalId: string };
		if (state != null) {
			setEditForm(true);
			setAnimalId(state.AnimalId);
			promise = getAnimalById(state.AnimalId);
			if (promise) {
				promise
					.then((data) => {
						response = data;
						return response.json();
					})
					.then(
						(data) => {
							if (response.status == 200) {
								setAnimal((prev) => ({
									...prev,
									Name: data.Name,
									BirthDate: data.BirthDate,

									AnimalTypeId: data.AnimalTypeId,
									OwnerId: data.OwnerId,
									ProfileImage: data.ProfileImage,
									Sex: data.Sex,
								}));
							}
							if (response.status == 500) {
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
	}, []);

	function handleChange(e): void {
		const { name, value } = e.target;
		let newValue = value;
		if (newValue == 'false') {
			newValue = false;
		}
		if (newValue == 'true') {
			newValue = true;
		}
		console.log(name + value);
		setAnimal((prev) => ({
			...prev,
			[name]: newValue,
		}));
		console.log(animal);
	}

	function handleDateChange(e): void {
		console.log(e);
		setAnimal((prev) => ({
			...prev,
			BirthDate: e,
		}));
	}

	function validateForm(): boolean {
		let isValid = true;

		for (const [name, value] of Object.entries(animal)) {
			error[name] = '';

			if (value === '' || value == undefined || value == null) {
				console.log(name);
				if (name != 'ProfileImage') {
					setError((prevErrors) => ({
						...prevErrors,
						[name]: 'Puste pole',
					}));
					isValid = false;
				}
			}
			if (name == 'AnimalTypeId') {
				const ft = animalTypes.filter((type) => {
					if (type.AnimalTypeId == value) {
						return true;
					}
				});
				console.log(ft);
				if (ft.length != 1) {
					setError((prevErrors) => ({
						...prevErrors,
						[name]: 'Niepoprawnie wypełnione pole',
					}));
					isValid = false;
				}
			}
		}
		return isValid;
	}

	function handleSubmit(e): void {
		e.preventDefault();
		console.log('Submitted');
		console.log(animal);
		if (validateForm()) {
			console.log('IsValid');
			let newAnimal;

			let response;
			let promise;
			if (editForm) {
				newAnimal = { ...animal, AnimalId: animalId };
				console.log(newAnimal);
				promise = updateAnimal(newAnimal);
			} else {
				newAnimal = animal;
				promise = registerAnimal(newAnimal);
			}

			if (promise) {
				promise
					.then((data) => {
						response = data;
						return response.json();
					})
					.then(
						(data) => {
							if (response.status === 201) {
								if (!editForm) {
									navigate('/animals', { state: { id: data.newId } });
								} else {
									navigate(`/animals/${animalId}`);
								}
							}
							if (response.status == 500) {
								setServerError(true);
							}
						},
						(error) => {
							console.log(error);
						}
					);
			}
		}
	}

	function setPhoto(preview): void {
		console.log(preview);
		setAnimal((prev) => ({
			...prev,
			ProfileImage: preview,
		}));
	}

	return (
		<form className="container " onSubmit={handleSubmit} noValidate style={{}}>
			<ServerErrorInfoComponenet serverError={serverError} />
			<div className="row">
				<div className="col-12">
					{editForm ? (
						<BreadCrumbComponent
							elements={[
								{ label: 'Zwierzęta', active: false, link: '/animals' },
								{ label: 'Profil', active: false, link: `animals/${animalId}` },
								{ label: 'Edycja', active: true, link: '' },
							]}
						/>
					) : (
						<BreadCrumbComponent
							elements={[
								{ label: 'Zwierzęta', active: false, link: '/animals' },

								{ label: 'Rejestracja', active: true, link: '' },
							]}
						/>
					)}
				</div>
			</div>
			<div className="row just">
				<div className="col-lg-4">
					<PhotoForm
						setPhoto={setPhoto}
						preview={animal.ProfileImage}
						editForm={editForm}
					/>
				</div>

				<div className="col-lg-4">
					<AnimalMainInfo
						ownerList={ownerList}
						handleChange={handleChange}
						error={error}
						animal={animal}
						animalTypes={animalTypes}
						editForm={editForm}
						handleDateChange={handleDateChange}
					/>
				</div>
			</div>
		</form>
	);
}

export default AnimalRegister;
