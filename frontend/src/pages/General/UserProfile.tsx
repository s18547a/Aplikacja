import { getCurrentUser } from '../../components/other/authHelper';
import { isOwner, isVet } from '../../components/other/userType';
import OwnerProfile from '../Owner/OwnerProfile';
import VetProfile from '../Vet/VetProfile/VetProfile';

function UserProfile() {
	console.log(getCurrentUser().userType);
	if (isOwner()) {
		return <OwnerProfile />;
	} else if (isVet()) {
		return <VetProfile />;
	} else return null;
}

export default UserProfile;
