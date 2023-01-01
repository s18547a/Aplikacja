function DayScheduldeComponenet({
	onChange,
	onCheckBoxChange,
	day,
	value,
	isFree,
	name,
	error,
}: {
	onChange: (any) => void;
	onCheckBoxChange: (any) => void;
	day: string;
	value: string;
	isFree: boolean;
	name: string;
	error: string;
}) {
	return (
		<div className="form-group">
			<div className="row justify-content-center mb-1">
				<div className="col-6">
					<label className="form-label">{day}</label>{' '}
				</div>
			</div>

			<div className="row">
				<div className="col-12">
					<div className="row">
						<div className="col-3">
							<input
								className="form-control"
								name={`start${name}`}
								type="time"
								value={value == '' ? '' : value.split('-')[0]}
								onChange={onChange}
							/>
						</div>
						<div className="col-1">
							<h5>-</h5>
						</div>

						<div className="col-3">
							<input
								className="form-control"
								name={`end${name}`}
								type="time"
								value={value == '' ? '' : value.split('-')[1]}
								onChange={onChange}
							/>
						</div>
						<div className="col-3">
							<div className="form-check">
								<input
									className="form-check-input"
									type="checkbox"
									name={name}
									value={''}
									onChange={onCheckBoxChange}
									checked={isFree == true}
								/>
								<label className="form-check-label">Wolne</label>
							</div>
						</div>
					</div>
				</div>
				<div className="col-12">
					<label className="form-text text-danger ">{error}</label>
				</div>
			</div>
		</div>
	);
}

export default DayScheduldeComponenet;
