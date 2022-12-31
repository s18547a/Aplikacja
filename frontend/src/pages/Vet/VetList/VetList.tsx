import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVets } from '../../../apiCalls/vetApiCalls';
import Vet from '../../../classes/Vet';
import TableOrEmpty from '../../../components/List/TableOrEmpty';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import ServerErrorInfoComponenet from '../../Shared/ServerErrorInfoComponent';

function VetList() {
	const [vetList, setVetList] = useState<Vet[]>([]);
	const [empty, setEmpty] = useState<boolean>(false);
	const [serverError, setServerError] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		let response;
		let promise;

		promise = getVets();
		if (promise) {
			promise
				.then((data) => {
					response = data;
					return response.json();
				})
				.then(
					(data) => {
						if (response.status == 200) {
							setVetList(data);
						}
						if (response.status == 500) {
							setServerError(true);
						}
					},
					(error) => {
						console.log(error);
						setServerError(true);
					}
				);
		}
	}, []);

	return (
		<div className="container">
			<ServerErrorInfoComponenet serverError={serverError} />
			<div className="row">
				<div className="col-6">
					<BreadCrumbComponent
						elements={[{ label: 'Weterynarze', active: true, link: '' }]}
					/>
				</div>
			</div>
			<div className="card card-body shadow">
				<div className="card-title">
					<h5>Lista weterynarzy</h5>
				</div>
				<TableOrEmpty>
					<table className="table table-hover">
						<thead>
							<tr>
								<th>Weterynarz</th>
								<th>Zatrudniony od</th>
							</tr>
						</thead>
						<tbody>
							{vetList.map((vet) => {
								return (
									<tr
										key={vet.VetId}
										onClick={() => {
											navigate('/vets/' + vet.VetId);
										}}
									>
										<td>{vet.Name + ' ' + vet.LastName}</td>
										<td>{vet.HireDate}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</TableOrEmpty>
			</div>
		</div>
	);
}

export default VetList;
