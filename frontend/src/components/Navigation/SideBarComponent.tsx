import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../utils/authHelper';
import { isOwner, isVet, isManager } from '../../utils/userType';
import AnimalDropdown from './Dropdowns/AnimalDropdown';
import ReservationDropdown from './Dropdowns/ReservationDropdown';
import SurgeryDropdown from './Dropdowns/SurgeryDropdown';
import UserProfileDropdown from './Dropdowns/UserProfileDropdown';
import VetDropdown from './Dropdowns/VetDropdown';
import VisitDropdown from './Dropdowns/VisitDropdown';

function SideBar(): ReactElement | null {
	const location = useLocation();

	const currentLocation = location.pathname;

	const vetNav = (
		<div className="row">
			<div className="col-12">
				<UserProfileDropdown />
			</div>
			<div className="col-12">
				<AnimalDropdown />
			</div>
			<div className="col-12">
				<ReservationDropdown />
			</div>
			<div className="col-12">
				<VisitDropdown />
			</div>
			<div className="col-12">
				<SurgeryDropdown />
			</div>
		</div>
	);

	const vetManagerNav = (
		<div className="row">
			<div className="col-12 ">
				<UserProfileDropdown />
			</div>
			<div className="col-12">
				<AnimalDropdown />
			</div>
			<div className="col-12">
				<ReservationDropdown />
			</div>
			<div className="col-12">
				<VisitDropdown />
			</div>
			<div className="col-12">
				<SurgeryDropdown />
			</div>
			<div className="col-12">
				<VetDropdown />
			</div>
		</div>
	);

	const ownerNav = (
		<div className="row">
			<div className="col-12">
				<UserProfileDropdown />
			</div>
			<div className="col-12">
				<AnimalDropdown />
			</div>
			<div className="col-12">
				<ReservationDropdown />
			</div>
			<div className="col-12">
				<VisitDropdown />
			</div>
			<div className="col-12">
				<SurgeryDropdown />
			</div>
		</div>
	);

	const userNaviagion = () => {
		if (!isAuthenticated()) {
			return null;
		} else if (isOwner()) {
			return ownerNav;
		} else {
			if (isVet() && isManager()) {
				return vetManagerNav;
			} else if (isVet() && !isManager()) {
				return vetNav;
			} else null;
		}
	};

	const authorizatedSideBar = () => {
		if (isAuthenticated()) {
			return (
				<div style={{ width: '150px', height: '100%' }} className="">
					<ul
						className="list-unstyled  "
						style={{ width: '150px', height: '100%' }}
					>
						{userNaviagion()}
					</ul>
				</div>
			);
		} else return null;
	};

	return authorizatedSideBar();
}

export default SideBar;
