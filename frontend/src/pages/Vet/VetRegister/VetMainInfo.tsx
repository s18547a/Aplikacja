import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import FormDate from '../../../components/Form/FormDate';
import FormDiv from '../../../components/Form/FormDiv';

function VetMainInfo(props) {
	return (
		<div className="card card-body shadow">
			<div className="card-title">
				<h5>Informacje</h5>

				<div className="row">
					<div className="col-12">
						<FormDiv
							name="Name"
							label="Imie"
							error={props.error.Name}
							onChange={props.handleChange}
							type="text"
							value={props.vet.Name}
						/>
					</div>
					<div className="col-12">
						<FormDiv
							name="LastName"
							label="Nazwisko"
							error={props.error.LastName}
							onChange={props.handleChange}
							type="text"
							value={props.vet.LastName}
						/>
					</div>
					<div className="col-12">
						<FormDiv
							name="Email"
							label="Email"
							error={props.error.Email}
							onChange={props.handleChange}
							type="text"
							value={props.vet.Email}
						/>
					</div>
					<div className="col-12">
						<FormDiv
							name="Contact"
							label="Numer telefonu"
							error={props.error.Contact}
							onChange={props.handleChange}
							type="text"
							value={props.vet.Contact}
						/>
					</div>
					{!props.editFrom ? (
						<div className="col-12">
							<FormDiv
								name="Password"
								label="Hasło"
								error={props.error.Password}
								onChange={props.handleChange}
								type="text"
							/>
						</div>
					) : null}

					<div className="col-12">
						<FormDate
							name="HireDate"
							label="Data zatrudnienia"
							error={props.error.HireDate}
							onChange={props.handleChange}
							type="date"
							value={props.vet.HireDate}
						/>
					</div>

					<div className="col-12">
						<SubmitFormButton
							label={props.editForm === true ? 'Zapisz ' : 'Zarejestruj'}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VetMainInfo;
