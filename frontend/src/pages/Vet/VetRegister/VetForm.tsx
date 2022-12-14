import { ReactElement, useEffect, useState } from 'react';
import {
	getVetByVetId,
	getVetTypes,
	registerVet,
	updateVet,
} from '../../../apiCalls/vetApiCalls';
import { useLocation, useNavigate } from 'react-router-dom';
import PhotoForm from '../../../components/Form/PhotoForm';
import VetMainInfo from './VetMainInfo';

import VetSpecForm from './VetSpecForm';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';

export interface IVetForm {
	Name: string;
	LastName: string;
	Contact: string;
	Email: string;
	Password: string;
	HireDate: string;
	ProfileImage: string | null;
	VetType: string[];
}

export interface IVetError {
	Name: string;
	LastName: string;
	Contact: string;
	Email: string;
	Password: string;
	HireDate: string;
}
export interface VetTypeI {
	VetType: string;
}
function VetForm(): ReactElement {
	const navigate = useNavigate();

	const [vetTypeList, setVetTypeList] = useState<VetTypeI[]>([]);

	const [vet, setVet] = useState<IVetForm>({
		Name: '',
		LastName: '',
		Contact: '',
		Email: '',
		Password: '',
		HireDate: '',
		ProfileImage: null,
		VetType: [],
	});

	const [error, setError] = useState({
		Name: '',
		LastName: '',
		Contact: '',
		Email: '',
		Password: '',
		HireDate: '',
	});
	const location = useLocation();
	const [editForm, setEditForm] = useState(false);
	const [editVetId, setVetId] = useState('');
	const [serverError, setServerError] = useState(false);
	useEffect(() => {
		let response;
		let promise;

		promise = getVetTypes();
		if (promise) {
			promise
				.then((data) => {
					response = data;
					return response.json();
				})
				.then(
					(data) => {
						if (response.status == 200) {
							setVetTypeList(data);
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

		const state = location.state as { VetId: string };
		if (state != null) {
			setEditForm(true);
			setVetId(state.VetId);

			promise = getVetByVetId(state.VetId);
			if (promise) {
				promise
					.then((data) => {
						response = data;
						return response.json();
					})
					.then(
						(data) => {
							if (response.status == 200) {
								const types = data.Types;
								let formTypes: string[] = [];
								types.forEach((element) => {
									formTypes.push(element.VetType);
								});
								setVet((prev) => ({
									...prev,
									VetId: data.VetId,
									Name: data.Name,
									LastName: data.LastName,
									Contact: data.Contact,
									OldEmail: data.Email,
									Email: data.Email,
									Password: 'Pass',
									HireDate: data.HireDate,
									ProfileImage: data.ProfileImage,
									VetType: formTypes,
								}));
							} else {
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
		setVet((prev) => ({
			...prev,
			[name]: value,
		}));
	}
	function handleVetTypeChange(e): void {
		const { name, value } = e.target;
		if (vet.VetType.includes(value)) {
			const newVetTypes = vet.VetType.filter((type) => {
				if (type != value) {
					return true;
				}
			});

			setVet((prev) => ({
				...prev,
				VetType: newVetTypes,
			}));
		} else if (!vet.VetType.includes(value)) {
			const newVetTypes = vet.VetType;
			newVetTypes.push(value);
			setVet((prev) => ({
				...prev,
				VetType: newVetTypes,
			}));
		}
	}

	function handleSubmit(e): void {
		e.preventDefault();
		console.log(vet);

		if (validateForm()) {
			let response;

			let promise;
			if (editForm) {
				promise = updateVet(vet);
			} else {
				promise = registerVet(vet);
			}

			if (promise) {
				promise
					.then((data) => {
						response = data;

						return response.json();
					})
					.then(
						(data) => {
							if (response.status == 201) {
								navigate('/vets');
							}
							if (response.status == 404) {
								setError((prev) => ({
									...prev,
									Email: 'Email jest ju?? zarejestrowany',
								}));
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
		}
	}

	function validateForm() {
		let isValid = true;

		for (const [name, value] of Object.entries(vet)) {
			error[name] = '';

			if (name === 'Email') {
				if (!value.includes('@') && value !== '') {
					setError((prevErrors) => ({
						...prevErrors,
						[name]: 'Niepoprawny format Email',
					}));
					isValid = false;
				}
			}
			if (value === '') {
				setError((prevErrors) => ({
					...prevErrors,
					[name]: 'Puste pole',
				}));
				isValid = false;
			}
		}
		return isValid;
	}

	function setPhoto(preview) {
		setVet((prev) => ({
			...prev,
			ProfileImage: preview,
		}));
	}
	return (
		<form className="container" onSubmit={handleSubmit}>
			<ServerErrorInfoComponenet serverError={serverError} />
			<div className="row">
				<div className="col-12">
					{editForm ? (
						<BreadCrumbComponent
							elements={[
								{ label: 'Wetrynarze', active: false, link: '/vets' },
								{ label: 'Profil', active: false, link: `vets/${editVetId}` },
								{ label: 'Edycja', active: true, link: '' },
							]}
						/>
					) : (
						<BreadCrumbComponent
							elements={[
								{ label: 'Weterynarze', active: false, link: '/vets' },

								{ label: 'Rejestracja', active: true, link: '' },
							]}
						/>
					)}
				</div>
			</div>
			<div className="row">
				<div className="col-4">
					<PhotoForm
						setPhoto={setPhoto}
						preview={vet.ProfileImage}
						editForm={editForm}
					/>
				</div>

				<div className="col-4">
					<VetMainInfo
						handleChange={handleChange}
						error={error}
						vet={vet}
						editForm={editForm}
					/>
				</div>

				<div className="col-4">
					<VetSpecForm
						handleChange={handleVetTypeChange}
						vetTypeList={vetTypeList}
						vetTypes={vet.VetType}
					/>
				</div>
			</div>
		</form>
	);
}

export default VetForm;
