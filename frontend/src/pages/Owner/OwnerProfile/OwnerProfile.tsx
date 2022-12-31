import { useEffect, useState } from 'react';
import { getOwnerById } from '../../../apiCalls/ownerApiCalls';
import Owner from '../../../classes/Owner';
import { getCurrentUser } from '../../../components/other/authHelper';
import ProfileDiv from '../../../components/other/ProfileDiv';

function OwnerProfile() {
	const [owner, setOwner] = useState<Owner>({
		OwnerId: undefined,
		Name: undefined,
		LastName: undefined,
		Contact: undefined,
		Email: undefined,
		Password: undefined,
	});
	const [error, setError] = useState({});
	const [serverError, setServerError] = useState(false);

	const getOwnerFromApi = async () => {
		const user = getCurrentUser();
		console.log(user);

		let response;
		getOwnerById(user.userTypeId)
			.then((res) => {
				response = res;
				return res.json();
			})
			.then(
				(data) => {
					if (response.status == 200) {
						setOwner(data);
					}
					if (response.status == 500) {
						setServerError(true);
					}
				},
				(error) => {
					setError(error);
					setServerError(true);
				}
			);
	};

	useEffect(() => {
		getOwnerFromApi();
	}, []);

	return (
		<div className="row justify-content-center">
			<div className="col-3">
				<div className="container card card-body shadow">
					<div className="row">
						<div className="col-12">
							<ProfileDiv label={'Imie'} value={owner.Name} />
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<ProfileDiv label={'Nazwisko'} value={owner.LastName} />
						</div>
					</div>
					<div className="row">
						<div className="col-12">
							<ProfileDiv label={'Email'} value={owner.Email} />
						</div>
					</div>

					<div className="row">
						<div className="col-12">
							<ProfileDiv label={'Kontakt'} value={owner.Contact} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OwnerProfile;
