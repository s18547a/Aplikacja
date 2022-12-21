import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getVetSchedulde, updateSchedulde } from '../../../api/vetApiCalls';
import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import DayScheduldeComponenet from './DayScheduldeComponent';

function VetScheduldeForm() {
	const params = useParams();

	const navigate = useNavigate();
	const [schedulde, setSchedulde] = useState({
		Monday: '-',
		Tuesday: '-',
		Wednesday: '-',
		Thursday: '-',
		Friday: '-',
		Saturday: '-',
		Sunday: '-',
	});

	const [freeSchedulde, setFreeSchedulde] = useState({
		Monday: false,
		Tuesday: false,
		Wednesday: false,
		Thursday: false,
		Friday: false,
		Saturday: false,
		Sunday: false,
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

	useEffect(() => {
		const VetId = params.VetId;
		let response;
		let promise;
		promise = getVetSchedulde(VetId);

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
								if (value == null) {
									setFreeSchedulde((prev) => ({
										...prev,
										[name]: true,
									}));
								} else {
									setSchedulde((prev) => ({
										...prev,
										[name]: value,
									}));
								}
							}
						}
					},
					(error) => {
						console.log(error);
					}
				);
		}
	}, []);

	function handleChange(e) {
		console.log(schedulde);
		console.log(e);
		const { name, value } = e.target;
		console.log(value);

		if (name.includes('start')) {
			const day = name.split('start')[1];
			console.log(day);
			const oldTime = schedulde[day];
			const oldEndTime = oldTime.split('-')[1];
			const newTime = `${value}-${oldEndTime}`;
			setSchedulde((prev) => ({
				...prev,
				[day]: newTime,
			}));
		}
		if (name.includes('end')) {
			const day = name.split('end')[1];
			const oldTime = schedulde[day];
			const oldStartTime = oldTime.split('-')[0];
			const newTime = `${oldStartTime}-${value}`;

			setSchedulde((prev) => ({
				...prev,
				[day]: newTime,
			}));
		}
		console.log(schedulde);
	}

	function handleCheckBoxChange(e) {
		const { name, value } = e.target;
		const newValue = !freeSchedulde[name];
		if (newValue == true) {
			setSchedulde((prev) => ({
				...prev,
				[name]: '-',
			}));
		}
		setFreeSchedulde((prev) => ({
			...prev,
			[name]: newValue,
		}));
		console.log(freeSchedulde);
	}

	function isValid() {
		let isValid = true;
		for (const [name, value] of Object.entries(schedulde)) {
			setError((prev) => ({
				...prev,
				[name]: '',
			}));

			const time = value.split('-');
			if (freeSchedulde[name] == false) {
				if (time[0] == '' || time[1] == '') {
					setError((prev) => ({
						...prev,
						[name]: 'Niedokończone wpisywanie',
					}));
					isValid = false;
				}
				if (time[0] > time[1]) {
					setError((prev) => ({
						...prev,
						[name]: 'Godzina rozpoczęcia musi być wcześniej',
					}));
					isValid = false;
				}
			}
		}

		return isValid;
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (isValid()) {
			const newSchedulde = {
				VetId: params.VetId,
			};

			for (const [name, value] of Object.entries(schedulde)) {
				if (freeSchedulde[name] == true) {
					newSchedulde[name] = null;
				} else newSchedulde[name] = value;
			}
			console.log(newSchedulde);

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
			<div className="row">
				<div className="col-lg-5 offset-lg-4 col-8">
					<div className="card card-body shadow">
						<div className="card-title">
							<h5>Harmonogram</h5>
						</div>
						<div className="row">
							<div className="col-12">
								<DayScheduldeComponenet
									day="Poniedziałek"
									value={schedulde.Monday}
									name="Monday"
									onChange={handleChange}
									onCheckBoxChange={handleCheckBoxChange}
									isFree={freeSchedulde.Monday}
									error={error.Monday}
								/>
							</div>

							<div className="col-12">
								<DayScheduldeComponenet
									day="Wtorek"
									value={schedulde.Tuesday}
									name="Tuesday"
									onChange={handleChange}
									onCheckBoxChange={handleCheckBoxChange}
									isFree={freeSchedulde.Tuesday}
									error={error.Tuesday}
								/>
							</div>
							<div className="col-12">
								<DayScheduldeComponenet
									day="Środa"
									value={schedulde.Wednesday}
									name="Wednesday"
									onChange={handleChange}
									onCheckBoxChange={handleCheckBoxChange}
									isFree={freeSchedulde.Wednesday}
									error={error.Wednesday}
								/>
							</div>
							<div className="col-12">
								<DayScheduldeComponenet
									day="Czwartek"
									value={schedulde.Thursday}
									name="Thursday"
									onChange={handleChange}
									onCheckBoxChange={handleCheckBoxChange}
									isFree={freeSchedulde.Thursday}
									error={error.Thursday}
								/>
							</div>
							<div className="col-12">
								<DayScheduldeComponenet
									day="Piątek"
									value={schedulde.Friday}
									name="Friday"
									onChange={handleChange}
									onCheckBoxChange={handleCheckBoxChange}
									isFree={freeSchedulde.Friday}
									error={error.Friday}
								/>
							</div>
							<div className="col-12">
								<DayScheduldeComponenet
									day="Sobota"
									value={schedulde.Saturday}
									name="Saturday"
									onChange={handleChange}
									onCheckBoxChange={handleCheckBoxChange}
									isFree={freeSchedulde.Saturday}
									error={error.Saturday}
								/>
							</div>
							<div className="col-12">
								<DayScheduldeComponenet
									day="Niedziela"
									value={schedulde.Sunday}
									name="Sunday"
									onChange={handleChange}
									onCheckBoxChange={handleCheckBoxChange}
									isFree={freeSchedulde.Sunday}
									error={error.Sunday}
								/>
							</div>
							<div className="col-12">
								<SubmitFormButton label="Zapisz" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}

export default VetScheduldeForm;
