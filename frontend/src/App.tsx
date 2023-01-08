import { useState } from 'react';
import {
	Route,
	Routes,
	Navigate,
	useNavigate,
	useLocation,
} from 'react-router-dom';
import { isAuthenticated } from './utils/authHelper';

import Navigation from './components/Banner/BannerComponent';

import OwnerRegister from './pages/Owner/OwnerForm/OwnerRegister';
import AnimalList from './pages/Animal/AnimalList/AnimalList';
import AnimalForm from './pages/Animal/AnimalRegister/AnimalForm';

import ReservationsList from './pages/Reservation/ReservationList/ReservationList';
import ReservationForm from './pages/Reservation/ReservationRegister/ReservationForm';
import VisitList from './pages/Visit/VisitList/VisitList';
import VisitRegister from './pages/Visit/VisitRegister/VisitForm';
import AnimalInfo from './pages/Animal/AnimalProfile/AnimalProfile';
import UserProfile from './pages/General/UserProfile';
import SurgeryForm from './pages/Surgery/SurgeryRegister/SurgeryForm';
import VisitProfile from './pages/Visit/VisitProfile/VisitProfile';
import VetList from './pages/Vet/VetList/VetList';
import { isManager, isVet } from './utils/userType';
import VetForm from './pages/Vet/VetRegister/VetForm';
import VetProfile from './pages/Vet/VetProfile/VetProfile';
import VetScheduldeForm from './pages/Vet/VetRegister/VetScheduldeForm';
import SideBar from './components/Navigation/SideBarComponent';
import HomePage from './pages/Unlogged/HomePage';
import MedicalInfoForm from './pages/Animal/AnimalRegister/MedicalInfoForm';
import SurgeryList from './pages/Surgery/SurgeryList/SurgeryList';
import SurgeryProfile from './pages/Surgery/SurgeryProfile/SurgeryProfile';
import NotFoundPage from './pages/General/NotFoundPage';

import BannerComponent from './components/Banner/BannerComponent';
import FooterComponenet from './components/Footers/FooterComponent';
const bootstrap = require('bootstrap');

function App() {
	const naviagate = useNavigate();
	const [user, changeUser] = useState(null);

	const handleLogin = (user) => {
		sessionStorage.setItem('user', user);
		changeUser(user);
	};
	const handleLogout = () => {
		sessionStorage.removeItem('user');
		changeUser(null);
		naviagate('/');
	};

	const isLogged = (element) => {
		if (isAuthenticated()) {
			return <Navigate to="/" />;
		} else return element;
	};
	const isNotLogged = (element) => {
		if (isAuthenticated()) {
			return element;
		} else return <Navigate to="/home" />;
	};

	const isNotPersonel = (element) => {
		if (isAuthenticated()) {
			if (isVet()) {
				return element;
			} else return <Navigate to="/home" />;
		} else return <Navigate to="/home" />;
	};
	const isNotManager = (elemet) => {
		if (isAuthenticated()) {
			if (isManager()) {
				return elemet;
			} else return <Navigate to="/home" />;
		} else return <Navigate to="/home" />;
	};
	const location = useLocation();

	const currentLocation = location.pathname;
	const style = currentLocation.includes('/home')
		? {
				height: '100%',
				width: '100%',
		  }
		: { height: '100%', width: '100%' };

	return (
		<div style={style}>
			<header
				className=" "
				style={{
					width: '100%',
					height: '8%',

					zIndex: 100,
				}}
			>
				<BannerComponent handleLogout={handleLogout} />
			</header>

			<div className="row" style={{ height: '90%', width: '100%' }}>
				{isAuthenticated() && (
					<div
						className="col-lg-1 col-12 "
						style={{
							position: 'fixed',
						}}
					>
						<SideBar />
					</div>
				)}
				<div className={isAuthenticated() ? 'col-lg-11 col-10' : 'col-12'}>
					<main
						className={currentLocation.includes('/home') ? '' : 'pt-2 offset-1'}
						style={{
							height: '100%',
							width: '100%',
						}}
					>
						<div className="row">
							<div className="col-12"></div>
						</div>
						<Routes>
							<Route
								path="/home"
								element={isLogged(<HomePage handleLogin={handleLogin} />)}
							/>

							<Route path="/" element={isNotLogged(<UserProfile />)} />

							<Route path="/animals" element={isNotLogged(<AnimalList />)} />
							<Route
								path="/animals/register"
								element={isNotLogged(<AnimalForm />)}
							/>

							<Route
								path="/animals/:AnimalId"
								element={isNotLogged(<AnimalInfo />)}
							/>
							<Route
								path="/animals/:AnimalId/edit"
								element={isNotLogged(<AnimalForm />)}
							/>

							<Route
								path="/reservations/register"
								element={isNotLogged(<ReservationForm />)}
							/>
							<Route
								path="/reservations"
								element={isNotLogged(<ReservationsList />)}
							/>

							<Route path="/visits" element={isNotLogged(<VisitList />)} />
							<Route
								path="/visits/register"
								element={isNotLogged(isNotPersonel(<VisitRegister />))}
							/>

							<Route
								path="/visits/:VisitId"
								element={isNotLogged(<VisitProfile />)}
							/>

							<Route
								path="/surgeries/register"
								element={isNotLogged(isNotPersonel(<SurgeryForm />))}
							/>
							<Route path="/surgeries" element={isNotLogged(<SurgeryList />)} />

							<Route
								path="/surgeries/:SurgeryId"
								element={isNotLogged(<SurgeryProfile />)}
							/>

							<Route path="/vets" element={isNotManager(<VetList />)} />
							<Route
								path="/vets/register"
								element={isNotManager(<VetForm />)}
							/>
							<Route
								path="/vets/:VetId"
								element={isNotManager(<VetProfile />)}
							/>
							<Route
								path="/vets/:VetId/edit"
								element={isNotManager(<VetForm />)}
							/>
							<Route
								path="/vets/:VetId/schedulde/edit"
								element={isNotManager(<VetScheduldeForm />)}
							/>

							<Route
								path="/animals/:AnimalId/medicalInfo/edit"
								element={isNotPersonel(<MedicalInfoForm />)}
							/>

							<Route path="*" element={<NotFoundPage />} />
						</Routes>
					</main>
				</div>
			</div>

			<FooterComponenet />
		</div>
	);
}

export default App;
