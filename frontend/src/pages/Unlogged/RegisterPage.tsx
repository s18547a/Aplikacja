import OwnerRegister from '../Owner/OwnerForm/OwnerRegister';

function RegisterPage({ changeTab }: { changeTab: (any) => void }) {
	return <OwnerRegister changeTab={changeTab} />;
}

export default RegisterPage;
