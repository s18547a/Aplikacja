import { ReactElement, useEffect, useState } from 'react';

import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import {
	getReservationsByVetId,
	getReservationsByOwner,
	getReservations,
	cancelReservation,
} from '../../../apiCalls/reservationApiCalls';
import Reservation from '../../../classes/Reservation';
import RegiserSuccessInfo from '../../../components/List/RegisterSuccessInfo';
import TableOrEmpty from '../../../components/List/TableOrEmpty';
import Modal from '../../../components/Modal/Modal';
import ModalEnableBtn from '../../../components/Modal/ModalEnableBtn';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentUser } from '../../../components/other/authHelper';
import {
	getCurrentDate,
	getCurrentHour,
} from '../../../components/other/getCurrentDate';
import { isVet, isManager, isOwner } from '../../../components/other/userType';
import ServerErrorInfoComponenet from '../../Shared/ServerErrorInfoComponent';

function ReservationList(): ReactElement {
	const navigate = useNavigate();

	const [reservationList, setReservationList] = useState<Reservation[]>([]);

	const [reservationId, setReservationId] = useState<string | undefined>(
		undefined
	);

	const [empty, setEmpty] = useState<boolean>(false);

	const [message, setMessage] = useState({
		id: '',
		message: '',
	});

	const [serverError, setServerError] = useState(false);
	async function loadReservationList(): Promise<void> {
		const currentUserId = getCurrentUser().userTypeId;

		let response;
		let promise;

		if (isVet() && !isManager()) {
			promise = getReservationsByVetId(currentUserId);
		}
		if (isOwner()) {
			promise = getReservationsByOwner(currentUserId);
		}
		if (isManager()) {
			promise = getReservations();
		}

		if (promise) {
			promise
				.then((data) => {
					response = data;
					return response.json();
				})
				.then(
					(data) => {
						if (response.status == 200) {
							setReservationList(data);
							setEmpty(false);
						}
						if (response.status == 404) {
							setEmpty(true);
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

	useEffect(() => {
		loadReservationList();

		const state = location.state as { id: string };
		if (state != null) {
			setMessage((prev) => ({
				...prev,
				id: state.id,
				message: 'Nowa rezerwacja: ',
			}));
		}
	}, []);

	const handleRowCancel = (event): void => {
		console.log('Cliced');
		const { name, value } = event.target;
		console.log(value);
		setReservationId(event.target.value);
	};

	const handleClick = (): void => {
		console.log('Cancel' + reservationId);

		let result;
		cancelReservation(reservationId)
			.then((res) => {
				result = res;
				return res.json();
			})
			.then((data) => {
				if (result.status == 201) {
					setMessage((prev) => ({
						id: data.deletedId,
						message: 'Anulowano rezerwacje ',
					}));
					loadReservationList();
				}
			});
	};

	const location = useLocation();
	const handleReliseReservation = (event): void => {
		const { name, value } = event.target;
		const realiseReservationParameters: string[] = value.split(',');

		navigate('/visits/register', {
			state: {
				ReservationId: realiseReservationParameters[0],
				Date: realiseReservationParameters[1],
				Hour: realiseReservationParameters[2],
				OwnerId: realiseReservationParameters[3],
			},
		});
	};

	return (
		<div className="container">
			<Modal
				id={'cancelReservation'}
				function={handleClick}
				label={'Czy na pewno?'}
			/>
			<ServerErrorInfoComponenet serverError={serverError} />
			<div className="row">
				<div className="col-6">
					<BreadCrumbComponent
						elements={[{ label: 'Rezerwacje', active: true, link: '' }]}
					/>
				</div>
			</div>
			<RegiserSuccessInfo newId={message.id} message={message.message} />

			<div className="card card-body shadow">
				<h5 className="card-title">Reserwacje</h5>
				<TableOrEmpty Empty={empty}>
					<table className="table table-hover">
						<thead>
							<tr>
								<th>Weterynarz</th>
								<th>Data</th>
								<th>Godzina</th>
								<th>Kontakt</th>
								<th>Akcje</th>
							</tr>
						</thead>

						<tbody>
							{reservationList.map((reservation) => {
								return (
									<tr
										key={reservation.ReservationId}
										className={
											getCurrentDate() >
												(reservation.Date == undefined
													? ''
													: reservation.Date) ||
											(getCurrentDate() == reservation.Date &&
												getCurrentHour() >
													(reservation.Hour == undefined
														? ''
														: reservation.Hour))
												? 'table-danger'
												: undefined
										}
									>
										<td>
											{reservation.Vet?.Name + ' ' + reservation.Vet?.LastName}
										</td>
										<td>{reservation.Date}</td>
										<td>{reservation.Hour}</td>
										<td>
											{isOwner()
												? reservation.Vet?.Contact
												: reservation.Owner?.Contact}
										</td>

										<td>
											<div className="row">
												<div className="col-auto">
													<ModalEnableBtn
														id={'cancelReservation'}
														className="btn btn-sm btn-danger"
														label="Anuluj"
														onClick={handleRowCancel}
														value={reservation.ReservationId}
													/>
												</div>
												<div className="col-auto">
													{isManager() || isVet() ? (
														<button
															className="btn btn-sm btn-primary"
															value={`${reservation.ReservationId},${reservation.Date},${reservation.Hour},${reservation.OwnerId}`}
															onClick={handleReliseReservation}
														>
															Zrealizuj
														</button>
													) : null}
												</div>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</TableOrEmpty>
			</div>
		</div>
	);
}

export default ReservationList;
