import { ReactElement } from 'react';

function FormTextField(props): ReactElement {
	function handleChange(e) {
		props.onChange(e);
	}

	return (
		<div className="form-group">
			<div className="row">
				<div className="col-12">
					<label className="form-label ">
						<h5>{props.label}</h5>
					</label>
				</div>

				<div className="col-12">
					<div className="row">
						<div className="col-12">
							<textarea
								className={
									props.error == '' || props.error == undefined
										? 'form-control '
										: 'form-control border border-danger'
								}
								name={props.name}
								onChange={handleChange}
								value={props.value}
								placeholder={props.placeholder}
								disabled={props.disabled}
								rows={5}
								lang={'pl-PL'}
							/>
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

export default FormTextField;
