import { ReactElement, useEffect, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getTodayReservationsByVetId } from '../../../apiCalls/reservationApiCalls';
import { getTodaySurgeries } from '../../../apiCalls/surgeryApiCalls';
import {
	getTodaySchedulde,
	getVetByVetId,
} from '../../../apiCalls/vetApiCalls';
import Reservation from '../../../classes/Reservation';
import Surgery from '../../../classes/Surgery';
import Vet from '../../../classes/Vet';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentUser } from '../../../utils/authHelper';
import { isManager } from '../../../utils/userType';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';

import TodayReservationList from './TodayReservationList';

import VetProfileTab from './VetProfileTab';
import { getCurrentDate } from '../../../utils/getCurrentDate';
import { changePageTitle } from '../../../utils/otherHelper';
function VetProfile(): ReactElement {
	const params = useParams();
	const location = useLocation();
	const [serverError, setServerError] = useState<boolean>(false);

	const [vet, setVet] = useState<Vet>({
		VetId: undefined,
		Name: undefined,
		LastName: undefined,
		Contact: undefined,
		Email: undefined,
		HireDate: undefined,
		ProfileImage: undefined,
		Types: [],
	});

	const [todayReservationList, setTodayReservations] = useState<Reservation[]>(
		[]
	);

	const [todaySurgeriesList, setTodaySurgeries] = useState<Surgery[]>([]);

	const [todaySchedulde, setTodaySchedulde] = useState<string[]>([]);

	useEffect(() => {
		changePageTitle('Profil');
		let VetId = getCurrentUser().userTypeId;
		if (location.pathname == '/') {
			VetId = getCurrentUser().userTypeId;
		} else {
			VetId = params.VetId;
		}

		const loadVet = async () => {
			let response;
			let promise;

			promise = getVetByVetId(VetId);
			if (promise) {
				promise
					.then((data) => {
						response = data;
						return response.json();
					})
					.then(
						(data) => {
							if (response.status == 200) {
								setVet(data);
							}
							if (response.status == 404) {
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
		};

		const loadVetReservations = async () => {
			let response;
			let promise;
			promise = getTodayReservationsByVetId(VetId);
			if (promise) {
				promise
					.then((data) => {
						response = data;
						return response.json();
					})
					.then(
						(data) => {
							if (response.status == 200) {
								setTodayReservations(data);
							}
							if (response.status == 404) {
								setTodayReservations([]);
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
		};

		const loadVetSurgeries = async () => {
			let response;
			let promise;
			promise = getTodaySurgeries(VetId);
			if (promise) {
				promise
					.then((data) => {
						response = data;
						return response.json();
					})
					.then(
						(data) => {
							if (response.status == 200) {
								setTodaySurgeries(data);
							}
							if (response.status == 404) {
								setTodaySurgeries([]);
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
		};

		const loadTodaySchedulde = async () => {
			let response;
			let promise;
			promise = getTodaySchedulde(getCurrentDate(), VetId);
			if (promise) {
				promise
					.then((data) => {
						response = data;
						return response.json();
					})
					.then(
						(data) => {
							if (response.status == 200) {
								setTodaySchedulde(data);
							}
							if (response.status == 404) {
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
		};

		loadVet();
		loadVetReservations();
		loadVetSurgeries();
		loadTodaySchedulde();
	}, []);

	return (
		<div className="container">
			<ServerErrorInfoComponenet serverError={serverError} />
			{isManager() && vet.VetId != getCurrentUser().userId ? (
				<div className="row">
					<div className="col-6">
						<BreadCrumbComponent
							elements={[
								{ label: 'Weterynarze', active: false, link: '/vets' },
								{
									label: 'Profil',
									active: true,
									link: '',
								},
							]}
						/>
					</div>
				</div>
			) : null}

			{/*<VetProfileNav activeTab={activeTab} onChange={onChangTab} />*/}
			<div className="row  mt-5">
				<div className="col-12">
					<VetProfileTab
						vet={vet}
						types={vet.Types}
						vetId={params.VetId}
						setServerError={() => {
							setServerError(true);
						}}
					/>
				</div>
				<div className="col-12 mt-5">
					<TodayReservationList
						visitList={todayReservationList}
						surgeryList={todaySurgeriesList}
						schedulde={todaySchedulde}
					/>
				</div>
			</div>
		</div>
	);
}

export default VetProfile;
