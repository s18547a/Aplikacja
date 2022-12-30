import { useEffect } from 'react';
import Owner from '../../../classes/Owner';
import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import FormCheck from '../../../components/Form/FormCheck';
import FormDateReactDiv from '../../../components/Form/FormDateRectDiv';
import FormDiv from '../../../components/Form/FormDiv';
import FormSelect from '../../../components/Form/FormSelect';
import { isOwner } from '../../../components/other/userType';
import FormAnimalTypeSelect from './FormAnimalTypeSelect';

function AnimalMainInfo(props: {
	ownerList: Owner[];
	handleChange;
	error;
	animal;
	location;
	animalTypes;
	editForm;
	handleDateChange;
}) {
	function handleChange(e) {
		props.handleChange(e);
	}
	function handleDateChange(e) {
		props.handleDateChange(e);
	}

	useEffect(() => {}, []);

	const ownerField = (
		<FormSelect
			label="Właściciel"
			name="OwnerId"
			onChange={handleChange}
			array={props.ownerList}
			id={'OwnerId'}
			elementLabel={'Email'}
			error={props.error.OwnerId}
			arrayIsObjectList={true}
			selectedValue={
				isOwner()
					? props.animal.OwnerId
					: props.editForm
					? props.animal.OwnerId
					: ''
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
						error={props.error.Name}
						type="text"
						onChange={handleChange}
						value={props.animal.Name}
					/>
				</div>
				<div className="col-12">
					<FormDateReactDiv
						label={'Data urodzenia'}
						value={props.animal.BirthDate}
						onChange={handleDateChange}
						error={props.error.BirthDate}
					/>
				</div>

				<div className="col-12">
					<FormAnimalTypeSelect
						label="Rodzaj"
						name="AnimalTypeId"
						onChange={handleChange}
						animalTypes={props.animalTypes}
						error={props.error.AnimalTypeId}
						arrayIsObjectList={true}
						dataListOptions="Animals"
						selectedValue={props.animal.AnimalTypeId}
						disabled={props.editForm}
					/>
				</div>
				<div className="col-12">{isOwner() ? null : ownerField}</div>
				<div className="col-12">
					<FormCheck
						label="Płeć"
						name="Sex"
						error={props.error.Sex}
						onChange={handleChange}
						selected={props.animal.Sex}
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
						label={props.editForm === true ? 'Zapisz zmiany' : 'Zarejestruj'}
					/>
				</div>
			</div>
		</div>
	);
}

export default AnimalMainInfo;
