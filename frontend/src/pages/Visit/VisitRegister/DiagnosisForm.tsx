import { useEffect, useState } from 'react';

interface DiagnosisI {
	Number: number;
	Description: String;
}

function DiagnosisForm(props) {
	const [diagnosisList, setDiagnosisList] = useState<DiagnosisI[]>([]);
	const [numberOfDiagnosis, setNumberOfDiagnosis] = useState(0);

	useEffect(() => {
		setDiagnosisList([]);
		setNumberOfDiagnosis(0);
	}, [props.AnimalId]);
	function addDiagnosis(e) {
		const newDiagnosos = { Number: numberOfDiagnosis, Description: '' };

		const newDignosisArray = diagnosisList.slice();
		newDignosisArray.push(newDiagnosos);
		const newDiagnosisNumber = numberOfDiagnosis + 1;
		setNumberOfDiagnosis(newDiagnosisNumber);
		setDiagnosisList(newDignosisArray);
	}

	function handleDiagnosisChange(e) {
		const { name, value } = e.target;

		for (let i = 0; i < diagnosisList.length; i++) {
			if (diagnosisList[i].Number == name) {
				diagnosisList[i].Description = value;
			}
		}
		console.log(diagnosisList);
		setDiagnosisListPrent();
	}

	function removeDiagnosis(e) {
		e.preventDefault();
		const { name, value } = e.target;
		const numberName = Number(value);
		console.log(numberName);

		const oldDiagnosisList = diagnosisList;
		const newDiagnosisList = oldDiagnosisList.filter((value) => {
			if (value.Number != numberName) {
				return value;
			}
		});
		setDiagnosisList(newDiagnosisList);
	}

	function setDiagnosisListPrent() {
		props.setDiagnosisList(diagnosisList);
	}

	const diagnosisFromComponenet =
		props.AnimalId != '' ? (
			<div className="mt-3">
				<div className="row">
					<div className="col-12">
						<a
							className="btn btn-primary"
							role={'button'}
							onClick={addDiagnosis}
						>
							Dodaj diagnozę
						</a>
					</div>
				</div>

				<div className="row">
					{diagnosisList.map((d) => {
						return (
							<div className="col-12 mt-1 mb-1" key={d.Number}>
								<div className=" card card-body shadow">
									<div>
										<button
											className="btn btn-close"
											value={d.Number}
											onClick={removeDiagnosis}
										></button>
									</div>
									<div className="row">
										<div className="col-12">
											<textarea
												name={String(d.Number)}
												className="form-control"
												onChange={handleDiagnosisChange}
												rows={2}
											/>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		) : null;
	return diagnosisFromComponenet;
}

export default DiagnosisForm;
