import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableOrEmpty from '../../../components/List/TableOrEmpty';

function TodayReservationList(props) {
	const [reservationList, setReservationList] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const propsList = props.list;
		setReservationList(propsList);
	});

	return (
		<div className="container">
			<div className="row">
				<div className="card card-body border-0 shadow">
					<div className="card-title">
						<h5>Dzisiejsze rezerwacje</h5>
					</div>
					<div className="row">
						<div className="col-12">
							<TableOrEmpty Empty={props.list.length == 0 ? true : false}>
								<table className="table">
									<thead>
										<tr>
											<th>Godzina</th>
											<th>Klient</th>
										</tr>
									</thead>
									<tbody>
										{props.list.map((reservationRow) => {
											return (
												<tr>
													<td>{reservationRow.Hour}</td>
													<td>{reservationRow.Owner?.Email}</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</TableOrEmpty>
						</div>
					</div>
				</div>
			</div>
			<div className="row mt-4">
				<div className="card card-body shadow no-border">
					<div className="card-title">
						<h5>Dzisiejsze zabiegi</h5>
					</div>
					<div className="row">
						<div className="col-12">
							<TableOrEmpty Empty={props.surgeries.length == 0 ? true : false}>
								<table className="table">
									<thead>
										<tr>
											<th>Typ</th>
											<th>Godzina</th>
											<th>Klient</th>
										</tr>
									</thead>
									<tbody>
										{props.surgeries.map((surgery) => {
											return (
												<tr
													onClick={() => {
														navigate(`/surgeries/${surgery.SurgeryId}`);
													}}
												>
													<td>{surgery.SurgeryType}</td>
													<td>{surgery.StartTime}</td>
													<td>{surgery.Animal.Name}</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</TableOrEmpty>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TodayReservationList;
