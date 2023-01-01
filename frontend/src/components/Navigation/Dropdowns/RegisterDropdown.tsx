import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import NavBtn from '../NavBtn';

function RegisterDropdown(): ReactElement {
	const location = useLocation();
	const currentLocation = location.pathname;

	return <NavBtn link={'/register'} label={'Rejestracja'} />;
}

export default RegisterDropdown;
