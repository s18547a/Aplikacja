import { ReactElement } from 'react';
import { ListUl, PersonPlus, Plus, PlusSquare } from 'react-bootstrap-icons';
import { useLocation } from 'react-router-dom';
import { isVet } from '../../../utils/userType';
import NavBtn from '../NavBtn';
import NavElement from '../NavElement';

function SurgeryDropdown(): ReactElement {
	if (isVet()) {
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
	} else return <NavBtn link={'/surgeries'} label={'Zabiegi'} />;
}

export default SurgeryDropdown;
