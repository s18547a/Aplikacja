import { ReactElement } from 'react';
import { CheckLg } from 'react-bootstrap-icons';
import Illness from '../../../classes/Illness';
import TableOrEmpty from '../../../components/List/TableOrEmpty';
import { isOwner } from '../../../utils/userType';

function AnimalIllnesses({
	updateIllness,
	illnessList,
}: {
	updateIllness: (any) => void;
	illnessList: Illness[];
}): ReactElement {
	function lupdateIllness(e) {
		e.preventDefault();
		const { name, value } = e.target;

		updateIllness(value);
	}

	return (
		<div className="row justify-content-center">
			<div className="col-8">
				<div className="card card-body border-0 shadow">
					<TableOrEmpty Empty={illnessList.length == 0}>
						<table className="table table-hover table-bordered">
							<thead className="">
								<tr>
									<th>Diagnoza</th>
									<th>Zdiagnozowano</th>
									<th>Wyleczono</th>
								</tr>
							</thead>
							<tbody>
								{illnessList.map((illness) => {
									return (
										<tr>
											<td>{illness?.Description}</td>
											<td className="">{illness?.DiagnosisDate}</td>

											<td>
												{illness?.RecoveryDate == null ? (
													isOwner() ? (
														<a className="btn btn-sm btn-danger">
															Niewyleczone
														</a>
													) : (
														<button
															value={JSON.stringify(illness)}
															onClick={lupdateIllness}
															className="btn btn-sm btn-danger"
														>
															Niewyleczone
														</button>
													)
												) : (
													illness.RecoveryDate
												)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</TableOrEmpty>
				</div>
			</div>
		</div>
	);
}

export default AnimalIllnesses;
