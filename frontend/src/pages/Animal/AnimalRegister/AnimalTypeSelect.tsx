import { useEffect, useState } from 'react';
import { getAnimalTypes } from '../../../apiCalls/animalApiCalls';
import AnimalType from '../../../classes/AnimalType';
import FormSelectReact from '../../../components/Form/FromSelectReact';

function AnimalTypeSelect({
	setServerError,
	error,
	editForm,
	handleAnimalTypeChange,
	selectedValue,
}) {
	const [animalTypeList, setAnimaLTypeList] = useState<AnimalType[]>([]);

	const [dataOptions, setDataOptions] = useState<
		{ label: string; value: string }[]
	>([]);

	function createOptionList(animalTypeList) {
		const optionList: { value: string; label: string }[] = [];

		animalTypeList.forEach((type) => {
			optionList.push({
				value: type.AnimalTypeId,
				label: `${type.Family} , ${type.Race}`,
			});
		});

		setDataOptions(optionList);
	}

	useEffect(() => {
		let promise, response;
		promise = getAnimalTypes();
		if (promise) {
			promise
				.then((data) => {
					response = data;

					return response.json();
				})
				.then(
					(data) => {
						if (response.status == 500) {
							setServerError();
						}
						if (response.status == 200) {
							setAnimaLTypeList(data);
							createOptionList(data);
						}
					},
					(error) => {
						console.log(error);
						setServerError();
					}
				);
		}
	}, []);

	return (
		<FormSelectReact
			options={dataOptions}
			error={error}
			label={'Rodzaj'}
			name="AnimalTypeId"
			disabled={false}
			selectedValue={selectedValue}
			onChange={handleAnimalTypeChange}
			editForm={editForm}
		/>
	);
}

export default AnimalTypeSelect;
