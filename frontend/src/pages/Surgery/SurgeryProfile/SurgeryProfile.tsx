import { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	getSurgery,
	updateSurgeryReport,
	cancelSurgery,
} from '../../../apiCalls/surgeryApiCalls';
import Surgery from '../../../classes/Surgery';
import Modal from '../../../components/Modal/Modal';
import ModalEnableBtn from '../../../components/Modal/ModalEnableBtn';
import BreadCrumbComponent from '../../../components/Navigation/BreadCrumbComponent';
import { getCurrentUser } from '../../../utils/authHelper';
import ProfileDiv from '../../../components/Profile/ProfileDiv';
import { isManager } from '../../../utils/userType';
import ServerErrorInfoComponenet from '../../Shared/ServerErrorInfoComponent';

import SurgeryReportForm from '../SurgeryRegister/SurgeryReportForm';

function SurgeryProfile(): ReactElement {
	const [surgery, setSurgery] = useState<Surgery>();
	const [editReport, setEditReport] = useState(false);
	const [report, setReport] = useState('');
	const [reload, setReload] = useState(false);
	const [serverError, setServerError] = useState(false);
	const navigate = useNavigate();

	const param = useParams();
	useEffect(() => {
		const surgeryId = param.SurgeryId;
		console.log(surgeryId);
		let response;
		getSurgery(surgeryId)
			.then((data) => {
				response = data;
				return data.json();
			})
			.then(
				(data) => {
					if (response.status == 200) {
						setSurgery(data);
						setReport(data.Report);
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
	}, []);

	useEffect(() => {
		const surgeryId = param.SurgeryId;
		console.log(surgeryId);
		let response;
		getSurgery(surgeryId)
			.then((data) => {
				response = data;
				return data.json();
			})
			.then(
				(data) => {
					if (response.status == 200) {
						setSurgery(data);
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
	}, [reload]);

	function onReportChange(e): void {
		const value = e.target.value;
		setReport(value);
	}

	function saveEditReport(): void {
		let response;
		updateSurgeryReport(report, surgery?.SurgeryId)
			.then((data) => {
				response = data;
				return data.json();
			})
			.then(
				(data) => {
					if (response.status == 201) {
						navigate(`/surgeries/${surgery?.SurgeryId}`);
						setEditReport(false);
						setReload(true);
					} else {
						setServerError(true);
					}
				},
				(error) => {
					console.log(error);
					setServerError(true);
				}
			);
	}

	const handleClick = (): void => {
		let result;
		cancelSurgery(surgery?.SurgeryId)
			.then((res) => {
				result = res;
				return res.json();
			})
			.then(
				() => {
					if (result.status == 500) {
						setServerError(true);
					}
					navigate('/surgeries');
				},
				() => {
					setServerError(true);
				}
			);
	};

	const saveEditButton = (
		<button
			onClick={saveEditReport}
			className="btn btn-primary btn-sm"
			style={{ background: 'green' }}
		>
			Zapisz
		</button>
	);
	const starteditButton = (
		<button
			onClick={() => {
				setEditReport(true);
			}}
			className="btn btn-primary btn-sm"
			style={{ background: 'green' }}
		>
			Edytuj
		</button>
	);
	const reportButton = !editReport ? starteditButton : saveEditButton;
	const reportContent = editReport ? (
		<SurgeryReportForm onChange={onReportChange} value={report} />
	) : (
		<div>{report}</div>
	);

	const deleteButton = (
		<ModalEnableBtn
			id={'cancelSurgery'}
			className="btn btn-sm btn-danger"
			label="Anuluj"
			function={null}
			value={surgery?.SurgeryId}
		/>
	);

	return (
		<div className="container">
			<Modal
				id={'cancelSurgery'}
				function={handleClick}
				label={'Czy na pewno?'}
			/>

			<div className="">
				<ServerErrorInfoComponenet serverError={serverError} />
				<div className="row">
					<div className="col-6">
						<BreadCrumbComponent
							elements={[
								{ label: 'Zabiegi', active: false, link: '/surgeries' },
								{
									label: 'Profil',
									active: true,
									link: '',
								},
							]}
						/>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="col-lg-4 ">
						<div className="card card-body shadow">
							<div className="card-title">
								<h5 className="">Informacje</h5>
							</div>
							<ProfileDiv label={'Data'} value={surgery?.Date} />
							<ProfileDiv label={'Rodzaj'} value={surgery?.SurgeryType} />
							<ProfileDiv
								label={'Weterynarz'}
								value={`${surgery?.Vet.Name} ${surgery?.Vet.LastName}`}
							/>

							<div className="row">
								<div className="col-6">
									<p className=" ">{'Operowany'}</p>
								</div>
								<div className="col-6">
									<p
										className="text-muted"
										style={{ color: 'black' }}
										onClick={() => {
											navigate(`/animals/${surgery?.Animal.AnimalId}`);
										}}
									>
										{surgery?.Animal.Name}
									</p>{' '}
								</div>
							</div>
						</div>

						<div className="card card-body shadow mt-3">
							<div className="card-title">
								<h5>Opis</h5>
							</div>
							<div className="">{surgery?.Description}</div>
						</div>
					</div>

					<div className="col-lg-4">
						<div className="card card-body shadow">
							<div className="row">
								<div className="col-6">
									<div className="card-title">
										<h5>Raport z operacji</h5>
									</div>
								</div>
								<div className="col-3">
									{surgery?.LeadVetId == getCurrentUser().userId || isManager()
										? reportButton
										: null}
								</div>
								<div className="col-3">
									{surgery?.LeadVetId == getCurrentUser().userId || isManager()
										? surgery?.Report == '' || surgery?.Report == null
											? deleteButton
											: null
										: null}
								</div>
							</div>
							<div className="row mt-3">
								<div className="col-12 ">{reportContent}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SurgeryProfile;
