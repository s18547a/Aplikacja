import { ReactElement } from 'react';
import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import FormDate from '../../../components/Form/FormDate';
import FormDiv from '../../../components/Form/FormDiv';
import { IVetError, IVetForm } from './VetForm';

function VetMainInfo({
	error,
	handleChange,
	vet,
	editForm,
}: {
	error: IVetError;
	handleChange: (any) => void;
	vet: IVetForm;
	editForm: boolean;
}): ReactElement {
	return (
		<div className="card card-body shadow">
			<div className="card-title">
				<h5>Informacje</h5>

				<div className="row">
					<div className="col-12">
						<FormDiv
							name="Name"
							label="Imie"
							error={error.Name}
							onChange={handleChange}
							type="text"
							value={vet.Name}
						/>
					</div>
					<div className="col-12">
						<FormDiv
							name="LastName"
							label="Nazwisko"
							error={error.LastName}
							onChange={handleChange}
							type="text"
							value={vet.LastName}
						/>
					</div>
					<div className="col-12">
						<FormDiv
							name="Email"
							label="Email"
							error={error.Email}
							onChange={handleChange}
							type="text"
							value={vet.Email}
						/>
					</div>
					<div className="col-12">
						<FormDiv
							name="Contact"
							label="Numer telefonu"
							error={error.Contact}
							onChange={handleChange}
							type="text"
							value={vet.Contact}
						/>
					</div>
					{!editForm ? (
						<div className="col-12">
							<FormDiv
								name="Password"
								label="Hasło"
								error={error.Password}
								onChange={handleChange}
								type="text"
							/>
						</div>
					) : null}

					<div className="col-12">
						<FormDate
							name="HireDate"
							label="Data zatrudnienia"
							error={error.HireDate}
							onChange={handleChange}
							type="date"
							value={vet.HireDate}
						/>
					</div>

					<div className="col-12">
						<SubmitFormButton
							label={editForm === true ? 'Zapisz ' : 'Zarejestruj'}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VetMainInfo;
