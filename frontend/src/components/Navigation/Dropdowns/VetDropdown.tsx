import { ReactElement } from 'react';
import { ListUl, PersonPlus } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';
import NavElement from '../NavElement';

function VetDropdown(): ReactElement {
	return (
		<NavElement
			id={'vets'}
			label={'Weterynarze'}
			mainLink={'/vets'}
			elements={[
				{ label: 'Lista', link: '/vets', icon: <ListUl /> },
				{ label: 'Zatrudnij', link: '/vets/register', icon: <PersonPlus /> },
			]}
		/>
	);
}

export default VetDropdown;
