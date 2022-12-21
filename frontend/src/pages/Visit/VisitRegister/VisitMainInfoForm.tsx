import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import FormDiv from '../../../components/Form/FormDiv';
import SelectAnimalComponent from '../../Shared/SelectAnimalComponent';
import SelectOwnerComponent from '../../Shared/SelectOwnerComponent';

function VisitMainInfoForm(props) {
	function onChange(e) {
		props.onChange(e);
	}
	function onChangeOwner(e) {
		props.onChangeOwner(e);
	}

	function setAPIError(value, errorField) {
		props.setAPIError(value, errorField);
	}

	return (
		<div className="card card-body shadow">
			<div className="card-title">
				<h5>Informacje</h5>
			</div>

			<div className="row">
				<SelectOwnerComponent
					onChange={onChangeOwner}
					error={props.error.OwnerId}
					selectedValue={props.visit.OwnerId}
					editForm={props.editForm}
				/>
			</div>
			<div className="row">
				<SelectAnimalComponent
					error={props.error.AnimalId}
					onChange={onChange}
					OwnerId={props.visit.OwnerId}
					setAPIError={setAPIError}
				/>
			</div>

			<div className="row">
				<FormDiv
					label="Data "
					name="Date"
					error={props.error.Date}
					type="date"
					onChange={onChange}
					value={props.visit.Date}
					disabled={props.editForm}
				/>
			</div>

			<div className="row">
				{/*
          <FormDiv
            label="Godzina "
            name="Hour"
            error={props.error.Hour}
            placeholder="00:00"
            onChange={onChange}
            value={props.visit.Hour}
            disabled={props.editForm}
          />*/}
				<div className="form-group">
					<div className="row">
						<div className="col-12">
							<div className="form-label">Godzina</div>
						</div>
						<div className="col-12">
							<input
								className={
									props.error.Hour != ''
										? 'form-control border-danger'
										: 'form-control '
								}
								disabled={props.editForm}
								name="Hour"
								type="time"
								onChange={onChange}
								value={props.visit.Hour}
							></input>
						</div>
						<div className="col-12">
							<label className="form-text text-danger ">
								{props.error.Hour}
							</label>
						</div>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="form-group">
					<div className="row">
						<div className="col-3">
							<label className="form-label">Rachunek</label>
						</div>

						<div className="col-9">
							<div className="row">
								<div className="col-12">
									<div>
										<p>{`${props.visit.Bill}.00 zł`}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="form-group">
					<div className="row">
						<div className="col-12">
							<div className="form-label">Spostrzeżenia</div>
						</div>
						<div className="col-12">
							<textarea
								name="Note"
								className="form-control"
								onChange={onChange}
								rows={5}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="row d-flex m-3">
				<SubmitFormButton label="Zapisz" />
			</div>
		</div>
	);
}

export default VisitMainInfoForm;
