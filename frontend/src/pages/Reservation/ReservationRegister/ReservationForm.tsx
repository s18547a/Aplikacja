import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerReservation } from '../../../api/reservationApiCalls';
import { getVetsOnDay, getValiableHours } from '../../../api/vetApiCalls';
import Owner from '../../../classes/Owner';
import Vet from '../../../classes/Vet';
import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import FormSelectLimit from '../../../components/Form/FormSelectLimit';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentUser } from '../../../components/other/authHelper';
import { errorAPIHandler } from '../../../components/other/errorAPIHelper';
import { isOwner } from '../../../components/other/userType';

import ReservationMainInfo from './ReservationMainInfo';
import ReservationVetChoice from './ReservationVetChoice';

interface ReservationI {
	Date: string | undefined;
	VetId: string | undefined;
	Hour: string | undefined;
	OwnerId: string | undefined;
}

function ReservationForm() {
	const navigate = useNavigate();
	const [date, setDate] = useState('');
	const [vets, setVets] = useState<Vet[]>([]);
	const [hours, setHours] = useState<string[]>([]);
	const [ownerList, setOwnerList] = useState<Owner[]>([]);

	const [reservation, setReservation] = useState<ReservationI>({
		Date: '',
		VetId: '',
		Hour: '',
		OwnerId: isOwner() ? getCurrentUser().userTypeId : '',
	});

	const [error, setError] = useState({
		Date: '',
		VetId: '',
		Hour: '',
		OwnerId: '',
	});

	async function handleDateChange(e) {
		e.preventDefault();
		const { name, value } = e.target;
		setReservation((prev) => ({
			...prev,
			Date: value,
		}));

		setDate(value);
		setHours([]);
		let promise;
		let response;
		promise = getVetsOnDay(value);
		if (promise) {
			promise
				.then((data) => {
					response = data;
					return response.json();
				})
				.then(
					(data) => {
						if (response.status == 200) {
							setError((prev) => ({
								...prev,
								Date: '',
							}));
							console.log(data);
							setVets(data);
						}
						if (response.status == 404) {
							setError((prev) => ({
								...prev,
								Date: 'W ten dzień nie przyjmujemy',
							}));
							setVets([]);
						}
					},
					(error) => {
						console.log(error);
					}
				);
		}
	}

	async function handleVetChange(e) {
		e.preventDefault();
		const { name, value } = e.target;
		console.log(value);
		setReservation((prev) => ({
			...prev,
			VetId: value,
			Hour: '',
		}));
		setHours([]);
		let response;
		let promise;
		promise = getValiableHours(date, value);
		if (promise) {
			promise
				.then((data) => {
					response = data;
					return response.json();
				})
				.then((data) => {
					if (response.status == 200) {
						setHours(data);
					}
					if (response.status == 404) {
						setError((prev) => ({
							...prev,
							Hour: 'Błąd',
						}));
					}
				});
		}
	}

	async function handleHourChange(e) {
		const { name, value } = e.target;

		setReservation((prev) => ({
			...prev,
			Hour: value,
		}));
	}

	async function handleOwnerChange(e) {
		const { name, value } = e.target;

		setReservation((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function validateForm() {
		let isValid = true;
		console.log(reservation);
		for (const [name, value] of Object.entries(reservation)) {
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

	function handleSubmit(e) {
		e.preventDefault();
		console.log(reservation);
		if (validateForm()) {
			let promise;
			let response;
			promise = registerReservation(reservation);
			if (promise) {
				promise
					.then((data) => {
						response = data;
						return response.json();
					})
					.then(
						(data) => {
							if (response.status == 201) {
								console.log(data.newId);
								navigate('/reservations', { state: { id: data.newId } });
							}
							if (response.status == 500) {
								const error = errorAPIHandler(data);

								setError((prevErrors) => ({
									...prevErrors,
									OwnerId: error,
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

	const vetChoiceComponent = reservation.Date ? (
		<ReservationVetChoice
			reservation={reservation}
			vets={vets}
			error={error.VetId}
			handleVetChange={handleVetChange}
		/>
	) : null;

	const hourChoiceComponenet = reservation.VetId ? (
		<div className="">
			<div className="col-12">
				<FormSelectLimit
					label="Godzina"
					name="hour"
					onChange={handleHourChange}
					array={hours}
					id={'element'}
					elementLabel={'element'}
					error={error.Hour}
					arrayIsObjectList={false}
					selectedValue={''}
					selected={false}
				/>
			</div>
		</div>
	) : null;
	return (
		<form className="container" onSubmit={handleSubmit}>
			<div className="row">
				<div className="col-6">
					<BreadCrumbComponent
						elements={[
							{ label: 'Rezerwacje', active: false, link: '/reservations' },
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
				<div className="col-lg-4 ">
					<div className="card card-body shadow">
						<ReservationMainInfo
							handleDateChange={handleDateChange}
							handleOwnerChange={handleOwnerChange}
							error={error}
							ownerList={ownerList}
						/>

						<div className="">{vetChoiceComponent}</div>
						<div className="">{hourChoiceComponenet}</div>

						{reservation.Hour && (
							<div className="">
								<SubmitFormButton label={'Zarezerwuj'} />
							</div>
						)}
					</div>
				</div>
			</div>
		</form>
	);
}

export default ReservationForm;
