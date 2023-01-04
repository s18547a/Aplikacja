import { ReactElement } from 'react';
import Vaccination from '../../../classes/Vaccination';
import VaccineType from '../../../classes/VaccineType';
import TableOrEmpty from '../../../components/List/TableOrEmpty';

function AnimalVaccines({
	vaccineList,
	coreList,
}: {
	vaccineList: Vaccination[];
	coreList: VaccineType[];
}): ReactElement {
	return (
		<div className="row justify-content-center">
			<div className="col-6 ">
				<div className="card card-body border-0 mt-8 shadow">
					<div className="row">
						<div className="col-lg-12 ">
							<div className="card-title">
								<h5>Historia szczepień</h5>
							</div>
							<TableOrEmpty Empty={vaccineList.length == 0}>
								<table className="table table-bordered">
									<thead>
										<tr>
											<th>Szczepionka</th>
											<th>Data</th>
										</tr>
									</thead>
									<tbody>
										{vaccineList.map((vaccination) => {
											return (
												<tr>
													<td>{vaccination.VaccineType}</td>
													<td>{vaccination.Date}</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</TableOrEmpty>
						</div>
					</div>
				</div>
				<div></div>
			</div>
			<div className="col-4">
				<div className="card card-body border-0 mt-8 shadow">
					<div className="card-title">
						<h5 className=" text-danger">Wymagane szczepienia</h5>
					</div>
					{coreList.length != 0 ? (
						<ul className=" list-group">
							{coreList.map((vaccine) => {
								return (
									<li className=" list-group-item">{vaccine.VaccineType}</li>
								);
							})}
						</ul>
					) : (
						<div className="alert-success fw-bold">
							<div>Wykonano wszystkie obowiązkowe</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default AnimalVaccines;
