import { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	getFullSchedulde,
	getVetSchedulde,
	updateSchedulde,
} from '../../../apiCalls/vetApiCalls';
import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import ServerErrorInfoBannerComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';

import NewScheduldeDayEditComponent from './NewScheduldeDayEditComponent';

export interface IVetScheduldeForm {
	Monday: string;
	Tuesday: string;
	Wednesday: string;
	Thursday: string;
	Friday: string;
	Saturday: string;
	Sunday: string;
}

function VetScheduldeForm(): ReactElement {
	const params = useParams();
	const [serverError, setServerError] = useState(false);

	const navigate = useNavigate();
	const [schedulde, setSchedulde] = useState({
		Monday: '',
		Tuesday: '',
		Wednesday: '',
		Thursday: '',
		Friday: '',
		Saturday: '',
		Sunday: '',
	});

	const [error, setError] = useState({
		Monday: '',
		Tuesday: '',
		Wednesday: '',
		Thursday: '',
		Friday: '',
		Saturday: '',
		Sunday: '',
	});
	const [vetId, setVetId] = useState<string>();
	const [fullSchedulde, setFullSchedulde] = useState<
		{
			VetId: string;
			Name: string;
			LastName: string;
			Monday: string;
			Tuesday: string;
			Wednesday: string;
			Thursday: string;
			Friday: string;
			Saturday: string;
			Sunday: string;
		}[]
	>([]);
	const naviagate = useNavigate();
	useEffect(() => {
		const paramVetId = params.VetId;
		setVetId(paramVetId);
		let response;
		let promise;
		promise = getVetSchedulde(paramVetId);

		if (promise) {
			promise
				.then((data) => {
					response = data;
					return response.json();
				})
				.then(
					(data) => {
						if (response.status == 200) {
							for (const [name, value] of Object.entries(data)) {
								setSchedulde((prev) => ({
									...prev,
									[name]: value,
								}));
								if (value == null) {
									setSchedulde((prev) => ({
										...prev,
										[name]: '',
									}));
								}
								//}
							}
						}
					},
					(error) => {
						console.log(error);
						setServerError(true);
					}
				);
		}
		promise = getFullSchedulde();
		if (promise) {
			promise
				.then((data) => {
					response = data;
					return data.json();
				})
				.then(
					(data) => {
						setFullSchedulde(data);
					},
					(error) => {
						setServerError(true);
						console.log(error);
					}
				);
		}
	}, []);

	function handleChange(e) {
		const { name, value } = e.target;
		console.log(value);
		setError((prev) => ({
			...prev,
			[name]: '',
		}));

		setSchedulde((prev) => ({
			...prev,
			[name]: value,
		}));
	}
	function isValid() {
		let isValid = true;
		for (const [name, value] of Object.entries(schedulde)) {
			setError((prev) => ({
				...prev,
				[name]: '',
			}));

			if (value != '') {
				const splitedHours = value.split('-');
				if (splitedHours.length != 2) {
					setError((prev) => ({
						...prev,
						[name]: 'error',
					}));
					isValid = false;
				} else {
					splitedHours.forEach((hours) => {
						const regex = '[0-2][0-9]:[0][0]';
						const match = hours.match(regex);
						if (match == null) {
							setError((prev) => ({
								...prev,
								[name]: 'error',
							}));
							isValid = false;
						}
						if (Number(hours.split(':')[0]) > 24) {
							if (match == null) {
								setError((prev) => ({
									...prev,
									[name]: 'error',
								}));
								isValid = false;
							}
						}
					});

					if (splitedHours[0] >= splitedHours[1]) {
						setError((prev) => ({
							...prev,
							[name]: 'error',
						}));
						isValid = false;
					}
				}
			}
		}
		console.log(error);

		return isValid;
	}

	function handleSubmit(e) {
		e.preventDefault();

		isValid();
		if (isValid()) {
			const newSchedulde = {
				VetId: params.VetId,
				...schedulde,
			};
			for (const [name, value] of Object.entries(newSchedulde)) {
				if (value == '') {
					newSchedulde[name] = null;
				}
			}
			console.log(newSchedulde);

			console.log(vetId);

			let results;
			updateSchedulde(newSchedulde)
				.then((res) => {
					results = res;
					return res.json();
				})
				.then(
					(data) => {
						if (results.status == 201) {
							navigate(`/vets/${params.VetId}`);
						}
						if (results.status == 500) {
							console.log(data);
						}
					},
					(error) => {
						console.log(error);
					}
				);
		}
	}
	return (
		<form className="container" onSubmit={handleSubmit}>
			<ServerErrorInfoBannerComponenet serverError={serverError} />
			<div className="row">
				<div className=" card card-body">
					<div className=" card-title">
						<h5>{`Edycja harmonogramu: ${
							fullSchedulde.filter((schedulde) => {
								if (schedulde.VetId == vetId) {
									return true;
								}
							})[0]?.Name
						} ${
							fullSchedulde.filter((schedulde) => {
								if (schedulde.VetId == vetId) {
									return true;
								}
							})[0]?.LastName
						}`}</h5>
					</div>
					<div className="row mb-1">
						<div className="col-2">
							<SubmitFormButton label={'Zapisz'} />
						</div>
					</div>
					<div className="row col-12">
						<table className="table table-bordered">
							<thead>
								<tr>
									<th>Weterynarz</th>
									<th>Poniedziałek</th>
									<th>Wtorek</th>
									<th>Środa</th>
									<th>Czwartek</th>
									<th>Piątek</th>
									<th>Sobota</th>
									<th>Niedziela</th>
								</tr>
							</thead>
							<tbody>
								<tr key={vetId} className="">
									<td>{`Edytowany`}</td>
									<td>
										<NewScheduldeDayEditComponent
											value={schedulde.Monday}
											onChange={handleChange}
											name={'Monday'}
											error={error.Monday}
										/>
									</td>
									<td>
										<NewScheduldeDayEditComponent
											value={schedulde.Tuesday}
											onChange={handleChange}
											name={'Tuesday'}
											error={error.Tuesday}
										/>
									</td>
									<td>
										<NewScheduldeDayEditComponent
											value={schedulde.Wednesday}
											onChange={handleChange}
											name={'Wednesday'}
											error={error.Wednesday}
										/>
									</td>
									<td>
										<NewScheduldeDayEditComponent
											value={schedulde.Thursday}
											onChange={handleChange}
											name={'Thursday'}
											error={error.Thursday}
										/>
									</td>
									<td>
										<NewScheduldeDayEditComponent
											value={schedulde.Friday}
											onChange={handleChange}
											name={'Friday'}
											error={error.Friday}
										/>
									</td>
									<td>
										<NewScheduldeDayEditComponent
											value={schedulde.Saturday}
											onChange={handleChange}
											name={'Saturday'}
											error={error.Saturday}
										/>
									</td>
									<td>
										<NewScheduldeDayEditComponent
											value={schedulde.Sunday}
											onChange={handleChange}
											name={'Sunday'}
											error={error.Sunday}
										/>
									</td>
								</tr>
								{fullSchedulde.map((vetSchdulde) => {
									if (vetId != vetSchdulde.VetId) {
										return (
											<tr key={vetSchdulde.VetId} className="">
												<td>{`${vetSchdulde.Name} ${vetSchdulde.LastName}`}</td>
												<td>{vetSchdulde.Monday}</td>
												<td>{vetSchdulde.Tuesday}</td>
												<td>{vetSchdulde.Wednesday}</td>
												<td>{vetSchdulde.Thursday}</td>
												<td>{vetSchdulde.Friday}</td>
												<td>{vetSchdulde.Saturday}</td>
												<td>{vetSchdulde.Sunday}</td>
											</tr>
										);
									}
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</form>
	);
}

export default VetScheduldeForm;
