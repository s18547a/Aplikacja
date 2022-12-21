import TableOrEmpty from '../../../components/List/TableOrEmpty';

function AnimalVaccines(props) {
	return (
		<div className="row justify-content-center">
			<div className="col-6 ">
				<div className="card card-body border-0 mt-8 shadow">
					<div className="row">
						<div className="col-lg-12 ">
							<div className="card-title">
								<h5>Historia szczepień</h5>
							</div>
							<TableOrEmpty Empty={props.vaccineList.length == 0}>
								<table className="table">
									<thead>
										<tr>
											<th>Szczepionka</th>
											<th>Data</th>
										</tr>
									</thead>
									<tbody>
										{props.vaccineList.map((vaccination) => {
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
					{props.coreList.length != 0 ? (
						<ul className=" list-group">
							{props.coreList.map((vaccine) => {
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
