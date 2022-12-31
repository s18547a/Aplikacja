import { useEffect, useState } from 'react';
import { getAnimalsbyOwner } from '../../apiCalls/animalApiCalls';
import Animal from '../../classes/Animal';

function SelectAnimalComponent(props) {
	const [animalList, setAnimalList] = useState<Animal[]>([]);

	function setServerError() {
		props.setServerError();
	}
	const getAnimalListFromApi = (OwnerId: String) => {
		if (props.OwnerId) {
			let promise;
			let response;

			promise = getAnimalsbyOwner(OwnerId);
			if (promise) {
				promise
					.then((data) => {
						response = data;
						return data.json();
					})
					.then(
						(data) => {
							if (response.status === 200) {
								setAnimalList(data);
							}
							if (response.status === 404) {
								setAnimalList([]);
							}
							if (response.status === 500) {
								setAnimalList([]);
								setServerError();
							}
						},
						(error) => {
							console.log(error);

							setAnimalList([]);
							//setServerError();
						}
					);
			}
		}
	};

	useEffect(() => {
		getAnimalListFromApi(props.OwnerId);
	}, [props.OwnerId]);

	function onChange(e) {
		props.onChange(e);
	}

	return (
		<div>
			<div className="form-group">
				<div className="form-label ">Zwierzę</div>
				{animalList.map((animal) => {
					return (
						<div className="form-check mt-3 form-control d-flex justify-content-between">
							<label
								className="form-check-label"
								htmlFor={`${animal.AnimalId}`}
							>
								{animal.Name}
							</label>
							<input
								className="form-check-input"
								type="radio"
								name="AnimalId"
								id={`${animal.AnimalId}`}
								value={`${animal.AnimalId}`}
								onChange={onChange}
							/>
						</div>
					);
				})}
			</div>
			<label className="form-text text-danger ">{props.error}</label>
		</div>
	);
}

export default SelectAnimalComponent;
