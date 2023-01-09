import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { isOwner, isVet } from '../../../utils/userType';
import NavBtn from '../NavBtn';

function UserProfileDropdown(): ReactElement {
	const location = useLocation();
	const currentLocation = location.pathname;

	return <NavBtn link={'/'} label={'Profil'} />;
}
export default UserProfileDropdown;
