import { ReactElement, useEffect } from 'react';
import Animal, { Sex } from '../../../classes/Animal';
import AnimalType from '../../../classes/AnimalType';
import Owner from '../../../classes/Owner';
import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import FormCheck from '../../../components/Form/FormCheck';
import FormDateReactDiv from '../../../components/Form/FormDateRectDiv';
import FormDiv from '../../../components/Form/FormDiv';
import FormSelect from '../../../components/Form/FormSelect';
import { isOwner } from '../../../components/other/userType';
import { IAnimalForm } from './AnimalForm';
import FormAnimalTypeSelect from './FormAnimalTypeSelect';

function AnimalMainInfo({
	ownerList,
	handleChange,
	error,
	animal,

	animalTypes,
	editForm,
	handleDateChange,
}: {
	ownerList: Owner[];
	handleChange: (any) => void;
	error: {
		OwnerId: string;
		Name: string;
		BirthDate: string;
		AnimalTypeId: string;
		Sex: string;
	};
	animal: IAnimalForm;
	animalTypes: AnimalType[];
	editForm: boolean;
	handleDateChange: (any) => void;
}): ReactElement {
	function handleChangeFuntion(e): void {
		handleChange(e);
	}
	function handleDateChangeFunction(e): void {
		handleDateChange(e);
	}

	useEffect(() => {}, []);

	const ownerField = (
		<FormSelect
			label="Właściciel"
			name="OwnerId"
			onChange={handleChangeFuntion}
			array={ownerList}
			id={'OwnerId'}
			elementLabel={'Email'}
			error={error.OwnerId}
			arrayIsObjectList={true}
			selectedValue={
				isOwner() ? animal.OwnerId : editForm ? animal.OwnerId : ''
			}
			dataListOptions="Owners"
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
					<FormAnimalTypeSelect
						label="Rodzaj"
						onChange={handleChangeFuntion}
						animalTypes={animalTypes}
						error={error.AnimalTypeId}
						dataListOptions="Animals"
						selectedValue={animal.AnimalTypeId}
						disabled={editForm}
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
