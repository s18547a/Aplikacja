import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import NavBtn from '../NavBtn';

function LoginDropdown(): ReactElement {
	return <NavBtn link={'/log'} label={'Logowanie'} />;
}
export default LoginDropdown;
