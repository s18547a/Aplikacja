import { ReactElement, useState } from 'react';
import { ListUl, PersonPlus, PlusSquare } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';
import NavElement from '../NavElement';

function AnimalDropdown(): ReactElement {
	const [collapsed, setCollapsed] = useState(false);
	const location = useLocation();
	const currentLocation = location.pathname;

	return (
		<NavElement
			id={'animals'}
			mainLink={'/animals'}
			label={'Zwierzęta'}
			elements={[
				{ label: 'Lista', link: '/animals', icon: <ListUl /> },
				{
					label: 'Zarejestruj',
					link: '/animals/register',
					icon: <PlusSquare />,
				},
			]}
		/>
	);
}

export default AnimalDropdown;
