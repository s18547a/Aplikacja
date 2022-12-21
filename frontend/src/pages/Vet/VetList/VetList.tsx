import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVets } from '../../../api/vetApiCalls';
import Vet from '../../../classes/Vet';
import TableOrEmpty from '../../../components/List/TableOrEmpty';

function VetList() {
	const [vetList, setVetList] = useState<Vet[]>([]);
	const [empty, setEmpty] = useState<boolean>(false);

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
					},
					(error) => {
						console.log(error);
					}
				);
		}
	}, []);

	return (
		<div className="container">
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
