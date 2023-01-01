import { ReactElement } from 'react';
import { getCurrentUser } from '../../components/other/authHelper';
import { isOwner, isVet } from '../../components/other/userType';
import OwnerProfile from '../Owner/OwnerProfile/OwnerProfile';
import VetProfile from '../Vet/VetProfile/VetProfile';

function UserProfile(): ReactElement | null {
	console.log(getCurrentUser().userType);
	if (isOwner()) {
		return <OwnerProfile />;
	} else if (isVet()) {
		return <VetProfile />;
	} else return null;
}

export default UserProfile;
