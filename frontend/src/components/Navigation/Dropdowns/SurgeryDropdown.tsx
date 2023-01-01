import { ReactElement } from 'react';
import { ListUl, PersonPlus, Plus, PlusSquare } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';
import NavElement from '../NavElement';

function SurgeryDropdown(): ReactElement {
	return (
		<NavElement
			id={'surgeries'}
			label={'Zabiegi'}
			mainLink={'/surgeries'}
			elements={[
				{ label: 'Lista', link: '/surgeries', icon: <ListUl /> },
				{
					label: 'Zarezerwuj',
					link: '/surgeries/register',
					icon: <PlusSquare />,
				},
			]}
		/>
	);
}

export default SurgeryDropdown;
