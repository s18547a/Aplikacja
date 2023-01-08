import { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import Async, { useAsync } from 'react-select/async';
function FormSelectReact({
	label,
	onChange,
	options,
	error,
	name,
	disabled,
	selectedValue,
	editForm,
}: {
	label: string;
	onChange: (any) => void;
	options: any[];
	error: string;
	name: string;
	disabled: boolean;
	selectedValue: any;
	editForm: boolean;
}) {
	return (
		<div className="form-group  ">
			<div></div>
			<div className="row">
				<div className="col-lg-3 col-md-12">
					<label htmlFor="exampleDataListA" className="form-label ">
						{label}
					</label>
				</div>

				<div className="col-12">
					<div className="row">
						<div className="col-12" style={{ zIndex: 4 }}>
							<ReactSelect
								onChange={onChange}
								options={options}
								name={name}
								placeholder={'Wybierz'}
								isDisabled={disabled}
								value={
									editForm
										? options.filter((x) => x.value == selectedValue)[0]
										: undefined
								}
							/>
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

export default FormSelectReact;
