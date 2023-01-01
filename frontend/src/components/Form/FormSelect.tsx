import { ReactElement } from 'react';

function FormSelect(props): ReactElement {
	function onChange(e) {
		props.onChange(e);
	}

	return (
		<div className="form-group  ">
			<div className="row">
				<div className="col-lg-3 col-md-12">
					<label htmlFor="exampleDataListA" className="form-label ">
						{props.label}
					</label>
				</div>

				<div className="col-12">
					<div className="row">
						<div className="col-12">
							<input
								name={props.name}
								className={
									props.error == ''
										? 'form-select '
										: 'form-select border border-danger'
								}
								list={props.dataListOptions}
								id="exampleDataListA"
								placeholder="Wybierz"
								onChange={onChange}
								defaultValue={props.selectedValue}
								disabled={props.disabled}
							/>
							<datalist id={props.dataListOptions}>
								{props.array.map((element) => {
									return props.arrayIsObjectList ? (
										<option
											key={element[props.id]}
											value={element[props.id]}
											label={element[props.elementLabel]}
											selected={props.selectedValue == element[props.id]}
										/>
									) : (
										<option key={element} value={element} label={element} />
									);
								})}
							</datalist>
						</div>
						<div className="col-12">
							<label className="form-text text-danger ">{props.error}</label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FormSelect;
