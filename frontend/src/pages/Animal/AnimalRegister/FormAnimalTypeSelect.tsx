import { ReactElement } from 'react';
import AnimalType from '../../../classes/AnimalType';

function FormAnimalTypeSelect({
	onChange,
	label,
	error,
	dataListOptions,
	selectedValue,
	disabled,
	animalTypes,
}: {
	onChange: (any) => void;
	label: string;
	error: string;
	dataListOptions: string;
	selectedValue: string | undefined;
	disabled: boolean;
	animalTypes: AnimalType[];
}): ReactElement {
	function onChangeFunction(e) {
		onChange(e);
	}

	return (
		<div className="form-group  ">
			<div className="row">
				<div className="col-12">
					<label htmlFor="exampleDataList" className="form-label ">
						{label}
					</label>
				</div>

				<div className="col-12">
					<div className="row">
						<div className="col-12">
							<input
								className={
									error == ''
										? 'form-control '
										: 'form-control border border-danger'
								}
								list={dataListOptions}
								id="exampleDataList"
								placeholder=""
								name="AnimalTypeId"
								onChange={onChangeFunction}
								defaultValue={selectedValue}
								disabled={disabled}
							/>
							<datalist id={dataListOptions}>
								{animalTypes.map((element) => {
									return (
										<option
											key={element.AnimalTypeId}
											value={element.AnimalTypeId}
											label={`${element?.Family}, ${element?.Race}`}
										/>
									);
								})}
							</datalist>
						</div>
						<div className="col-12">
							<label className="form-text text-danger ">{error}</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FormAnimalTypeSelect;
