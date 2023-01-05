import { ReactElement } from 'react';
import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import FormDiv from '../../../components/Form/FormDiv';
import SelectAnimalComponent from '../../../components/Form/SelectAnimalComponent';
import SelectOwnerComponent from '../../../components/Form/SelectOwnerComponent';
import { IVisitError, IVisitForm } from './VisitForm';

function VisitMainInfoForm({
	onChange,
	onChangeOwner,
	setServerError,
	error,
	visit,
	editForm,
}: {
	onChange: (any) => void;
	onChangeOwner: (any) => void;
	setServerError: () => void;
	error: IVisitError;
	visit: IVisitForm;
	editForm: boolean;
}): ReactElement {
	return (
		<div className="card card-body shadow">
			<div className="card-title">
				<h5>Informacje</h5>
			</div>

			<div className="row">
				<SelectOwnerComponent
					onChange={onChangeOwner}
					error={error.OwnerId}
					selectedValue={visit.OwnerId}
					editForm={editForm}
					setServerError={setServerError}
				/>
			</div>
			<div className="row">
				<SelectAnimalComponent
					error={error.AnimalId}
					onChange={onChange}
					OwnerId={visit.OwnerId}
					setServerError={setServerError}
				/>
			</div>

			<div className="row">
				<FormDiv
					label="Data "
					name="Date"
					error={error.Date}
					type="date"
					onChange={onChange}
					value={visit.Date}
					disabled={editForm}
				/>
			</div>

			<div className="row">
				<div className="form-group">
					<div className="row">
						<div className="col-12">
							<div className="form-label">Godzina</div>
						</div>
						<div className="col-12">
							<input
								className={
									error.Hour != ''
										? 'form-control border-danger'
										: 'form-control '
								}
								disabled={editForm}
								name="Hour"
								type="time"
								onChange={onChange}
								value={visit.Hour}
							></input>
						</div>
						<div className="col-12">
							<label className="form-text text-danger ">{error.Hour}</label>
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
										<p>{`${visit.Bill}.00 zł`}</p>
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
							<div className="form-label">Notatka</div>
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
