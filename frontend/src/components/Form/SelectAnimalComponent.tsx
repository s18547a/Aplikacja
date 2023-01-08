import { ReactElement, useEffect, useState } from 'react';
import { getAnimalsbyOwner } from '../../apiCalls/animalApiCalls';
import Animal from '../../classes/Animal';

function SelectAnimalComponent({
	setServerError,
	OwnerId,
	onChange,
	error,
}: {
	setServerError: () => void;
	OwnerId: string;
	onChange: (any) => void;
	error: string;
}): ReactElement {
	const [animalList, setAnimalList] = useState<Animal[]>([]);

	function setServerErrorFunction() {
		setServerError();
	}
	const getAnimalListFromApi = (OwnerId: String) => {
		if (OwnerId) {
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
								setServerErrorFunction();
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
		getAnimalListFromApi(OwnerId);
	}, [OwnerId]);

	function onChangeFunction(e) {
		onChange(e);
	}

	return (
		<div>
			<div className="form-group">
				<div className="form-label ">Zwierzę</div>
				{animalList.map((animal) => {
					return (
						<div
							key={animal.AnimalId}
							className={
								error == ''
									? 'form-check mt-3 form-control d-flex justify-content-between'
									: 'form-check mt-3 form-control d-flex justify-content-between border border-danger'
							}
						>
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
								onChange={onChangeFunction}
							/>
						</div>
					);
				})}
			</div>
			<label className="form-text text-danger ">{error}</label>
		</div>
	);
}

export default SelectAnimalComponent;
