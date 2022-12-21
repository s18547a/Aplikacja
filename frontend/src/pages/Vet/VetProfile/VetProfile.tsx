import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getTodayReservationsByVetId } from '../../../api/reservationApiCalls';
import { getTodaySurgeries } from '../../../api/surgeryApiCalls';
import { getVetByVetId } from '../../../api/vetApiCalls';
import Reservation from '../../../classes/Reservation';
import Surgery from '../../../classes/Surgery';
import Vet from '../../../classes/Vet';
import { getCurrentUser } from '../../../components/other/authHelper';

import TodayReservationList from './TodayReservationList';
import VetProfileNav from './VetProfileNav';
import VetProfileTab from './VetProfileTab';
function VetProfile() {
	const params = useParams();
	const location = useLocation();

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

	useEffect(() => {
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
							}
						},
						(error) => {}
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
							}
						},
						(error) => {}
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
							}
						},
						(error) => {}
					);
			}
		};

		loadVet();
		loadVetReservations();
		loadVetSurgeries();
	}, []);

	const [activeTab, setActiveTab] = useState('');
	function onChangTab(e) {
		const { name, value } = e.target;
		setActiveTab(value);
	}

	const profileTab = (
		<VetProfileTab vet={vet} types={vet.Types} vetId={params.VetId} />
	);
	const reservationTab = (
		<TodayReservationList
			list={todayReservationList}
			surgeries={todaySurgeriesList}
		/>
	);

	function setContent() {
		if (activeTab == '') {
			return profileTab;
		}
		if (activeTab == 'res') {
			return reservationTab;
		}
	}
	return (
		<div className="container">
			<VetProfileNav activeTab={activeTab} onChange={onChangTab} />
			<div className="row">
				<div className="col-12">{setContent()}</div>
			</div>
		</div>
	);
}

export default VetProfile;