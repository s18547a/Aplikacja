import { useEffect, useState } from 'react';
import { getAnimalUnadminstratedVaccines } from '../../../apiCalls/animalApiCalls';
import VaccineType from '../../../classes/VaccineType';

function VisitVaccineForm(props) {
	const [vaccineList, setVaccineList] = useState<VaccineType[]>([]);

	async function getAnimalUnadminstratedVaccinesApiCall(AnimalId) {
		if (props.AnimalId) {
			let results;
			getAnimalUnadminstratedVaccines(AnimalId)
				.then((data) => {
					results = data;

					return data.json();
				})
				.then(
					(data) => {
						if (results.status == 200) {
							setVaccineList(data);
						}
						if (results.status == 404) {
							setVaccineList([]);
						}
						if (results.status == 500) {
						}
					},
					(error) => {}
				);
		}
	}
	useEffect(() => {
		console.log('JEes');

		getAnimalUnadminstratedVaccinesApiCall(props.AnimalId);
	}, [props.AnimalId]);

	function onChange(e) {
		props.onChange(e);
	}

	return (
		<div className="card card-body shadow">
			<div className="card-title">
				<h5>Szczepienia</h5>
			</div>
			<div className="form-group">
				{vaccineList.map((vaccineType) => {
					return (
						<div className="form-check">
							<input
								className="form-check-input"
								onChange={onChange}
								type="checkbox"
								value={`${vaccineType.VaccineType}`}
								id="flexCheckDefault"
							/>
							<label className="form-check-label" htmlFor="flexCheckDefault">
								{vaccineType.VaccineType}
							</label>{' '}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default VisitVaccineForm;
