import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import NavBtn from '../NavBtn';

function ClinicInfoDropdown(): ReactElement {
	return <NavBtn link={'/info'} label={'Informacje'} />;
}

export default ClinicInfoDropdown;
