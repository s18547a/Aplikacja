import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVisitById } from '../../../api/visitApiCalls';
import Visit from '../../../classes/Visit';
import ProfileDiv from '../../../components/other/ProfileDiv';

function VisitProfile() {
	const [visit, setVist] = useState<Visit>();

	const param = useParams();

	useEffect(() => {
		const VisitId = param.VisitId;
		const loadVisit = async () => {
			let promise;
			let response;

			promise = getVisitById(VisitId);
			if (promise) {
				promise
					.then((data) => {
						response = data;
						return response.json();
					})
					.then(
						(data) => {
							if (response.status == 200) {
								setVist(data);
							}
							if (response.status == 404) {
							}
						},
						(error) => {
							console.log(error);
						}
					);
			}
		};

		loadVisit();
	}, []);

	return (
		<div className="container ">
			<div className="row justify-content-center">
				<div className="col-lg-4">
					<div className="card card-body shadow">
						<div className="card-title">
							<h5>Informacje</h5>
						</div>
						<div className="row justify-content-center">
							<ProfileDiv value={visit?.Date} label="Data" />

							<ProfileDiv value={visit?.Hour} label="Godzina" />

							<ProfileDiv value={visit?.Animal.Name} label="Pacjent" />

							<ProfileDiv
								value={`${visit?.Vet.Name} ${visit?.Vet.LastName}`}
								label="Weterynarz"
							/>

							<ProfileDiv value={visit?.Bill} label="Rachunek" />
						</div>
					</div>
				</div>

				<div className="col-lg-4">
					<div className="card card-body shadow">
						<div className="card-title">
							<h5>Czynności</h5>
						</div>
						<ul className="list-group list-group-flush">
							{visit?.MedicalActivities.map((activity) => {
								return (
									<li className="list-group-item"> {activity.ActivityName}</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VisitProfile;