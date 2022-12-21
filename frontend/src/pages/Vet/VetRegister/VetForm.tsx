import { useEffect, useState } from 'react';
import {
	getVetByVetId,
	getVetTypes,
	registerVet,
	updateVet,
} from '../../../api/vetApiCalls';
import { useLocation, useNavigate } from 'react-router-dom';
import PhotoForm from '../../Shared/PhotoForm';
import VetMainInfo from './VetMainInfo';

import VetSpecForm from './VetSpecForm';

interface VetI {
	Name: string;
	LastName: string;
	Contact: string;
	Email: string;
	Password: string;
	HireDate: string;
	ProfileImage: string | null;
	VetType: string[];
}
interface VetTypeI {
	VetType: string;
	Salary: number;
}
function VetForm() {
	const navigate = useNavigate();

	const [vetTypeList, setVetTypeList] = useState<VetTypeI[]>([]);

	const [vet, setVet] = useState<VetI>({
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
					},
					(error) => {
						console.log(error);
					}
				);
		}

		const state = location.state as { VetId: string };
		if (state != null) {
			setEditForm(true);

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
							}
						},
						(error) => {
							console.log(error);
						}
					);
			}
		}
	}, []);

	function handleChange(e) {
		const { name, value } = e.target;
		setVet((prev) => ({
			...prev,
			[name]: value,
		}));
	}
	function handleVetTypeChange(e) {
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

	function handleSubmit(e) {
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
									Email: 'Email jest już zarejestrowany',
								}));
							}
						},
						(error) => {
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
