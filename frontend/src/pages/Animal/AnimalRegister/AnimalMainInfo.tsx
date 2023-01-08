import { ReactElement, useEffect, useState } from 'react';
import AnimalType from '../../../classes/AnimalType';

import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import FormCheck from '../../../components/Form/FormCheck';
import FormDateReactDiv from '../../../components/Form/FormDateRectDiv';
import FormDiv from '../../../components/Form/FormDiv';

import FormSelectReact from '../../../components/Form/FromSelectReact';
import SelectOwnerComponent from '../../../components/Form/SelectOwnerComponent';
import { isOwner } from '../../../utils/userType';
import { IAnimalForm } from './AnimalForm';
import AnimalTypeSelect from './AnimalTypeSelect';

function AnimalMainInfo({
	handleChange,
	error,
	animal,

	editForm,
	handleDateChange,
	handleOwnerChange,
	setServerError,
	handleAnimalTypeChange,
}: {
	handleChange: (any) => void;
	error: {
		OwnerId: string;
		Name: string;
		BirthDate: string;
		AnimalTypeId: string;
		Sex: string;
	};
	animal: IAnimalForm;

	editForm: boolean;
	handleDateChange: (any) => void;
	handleOwnerChange: (any) => void;
	setServerError: () => void;
	handleAnimalTypeChange: (any) => void;
}): ReactElement {
	function handleChangeFuntion(e): void {
		handleChange(e);
	}
	function handleDateChangeFunction(e): void {
		handleDateChange(e);
	}
	const [animalTypeList, setAnimalTypeList] =
		useState<{ value: string; label: string }[]>();

	const ownerField = (
		<SelectOwnerComponent
			setServerError={setServerError}
			onChange={handleOwnerChange}
			error={error.OwnerId}
			selectedValue={animal.OwnerId}
			editForm={editForm}
			realised={false}
		/>
	);

	return (
		<div className="card card-body shadow">
			<div className="card-title">
				<h5>Informacje podstawowe</h5>
			</div>
			<div className="row">
				<div className="col-12">
					<FormDiv
						label="Imie"
						name="Name"
						error={error.Name}
						type="text"
						onChange={handleChange}
						value={animal.Name}
					/>
				</div>
				<div className="col-12">
					<FormDateReactDiv
						label={'Data urodzenia'}
						value={animal.BirthDate}
						onChange={handleDateChangeFunction}
						error={error.BirthDate}
					/>
				</div>

				<div className="col-12">
					<AnimalTypeSelect
						setServerError={setServerError}
						error={error.AnimalTypeId}
						editForm={editForm}
						handleAnimalTypeChange={handleAnimalTypeChange}
						selectedValue={animal.AnimalTypeId}
					/>
				</div>
				<div className="col-12">{isOwner() ? null : ownerField}</div>
				<div className="col-12">
					<FormCheck
						label="Płeć"
						name="Sex"
						error={error.Sex}
						onChange={handleChangeFuntion}
						selected={animal.Sex}
						elements={[
							{
								value: 1,
								id: 'male',
								label: 'Samiec',
							},
							{
								value: 2,
								id: 'female',
								label: 'Samica',
							},
							{
								value: 0,
								id: 'unknown',
								label: 'Nieokreślono',
							},
						]}
					/>
				</div>
				<div className="col-12 mt-3">
					<SubmitFormButton
						label={editForm === true ? 'Zapisz zmiany' : 'Zarejestruj'}
					/>
				</div>
			</div>
		</div>
	);
}

export default AnimalMainInfo;
