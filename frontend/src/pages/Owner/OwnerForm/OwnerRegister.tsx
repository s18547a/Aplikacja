import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerOwnerApiCall } from '../../../apiCalls/ownerApiCalls';
import SubmitFormButton from '../../../components/Buttons/SubmitFormButton';
import FormDiv from '../../../components/Form/FormDiv';
import ServerErrorInfoComponenet from '../../../components/InfoBanners/ServerErrorInfoBannerComponent';

interface IOwnerForm {
	Name: string;
	LastName: string;
	Contact: string;
	Email: string;
	Password: string;
}
function OwnerForm({
	changeTab,
}: {
	changeTab: (any) => void | null;
}): ReactElement {
	const [owner, setOwner] = useState<IOwnerForm>({
		Name: '',
		LastName: '',
		Contact: '',
		Email: '',
		Password: '',
	});
	const [error, setError] = useState({
		Name: '',
		LastName: '',
		Contact: '',
		Email: '',
		Password: '',
	});

	const [passwordError, setPasswordError] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [serverError, setServerError] = useState(false);

	function handleChange(e): void {
		const { name, value } = e.target;

		setOwner((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function validateForm(): boolean {
		let isValid = true;

		for (const [name, value] of Object.entries(owner)) {
			error[name] = '';
			setPasswordError('');

			if (name === 'Email') {
				if (!value.includes('@') && value !== '') {
					setError((prevErrors) => ({
						...prevErrors,
						[name]: 'Niepoprawny format Email',
					}));
					isValid = false;
				}
			}
			if (name == 'Password') {
				if (value != repeatPassword) {
					setPasswordError('Hasła muszą być takie same');
					isValid = false;
				}
			}
			if (value === '') {
				setError((prevErrors) => ({
					...prevErrors,
					[name]: 'Puste pole',
				}));
				isValid = false;
			}
			if (value == '') {
				setError((prevErrors) => ({
					...prevErrors,
					[name]: 'Puste pole',
				}));
				isValid = false;
			}
			if (name == 'Contact') {
				const isNumber = /^\d+$/.test(value);

				if (value.length < 9 || !isNumber) {
					setError((prevErrors) => ({
						...prevErrors,
						[name]: 'Niepoprawny number',
					}));
					isValid = false;
				}
			}
		}
		return isValid;
	}

	function changeTabFunction(): void {
		changeTab('login');
	}
	function handleSubmit(e): void {
		e.preventDefault();

		if (validateForm()) {
			let response;
			let promise;
			promise = registerOwnerApiCall(owner);
			if (promise) {
				promise
					.then((data) => {
						response = data;

						return response.json();
					})
					.then(
						(data) => {
							if (response.status === 500) {
								setServerError(true);
							}
							if (response.status == 404) {
								setError((prev) => ({
									...prev,
									Email: 'Email jest już zarejestrowany',
								}));
							}
							if (response.status === 201) {
								changeTabFunction();
							}
						},
						(error) => {
							console.log(error);
							setServerError(true);
						}
					);
			}
		}
	}

	function handleRepeatPassword(e): void {
		const { name, value } = e.target;
		setRepeatPassword(value);
	}

	return (
		<form className="container " onSubmit={handleSubmit} noValidate={true}>
			<ServerErrorInfoComponenet serverError={serverError} />
			<div className="row justify-content-center">
				<div className="col-lg-6">
					<div className="card card-body border-0 shadow">
						<div className="row">
							<div className="col-12">
								<div className="row">
									<div className="col-lg-12">
										<FormDiv
											name="Name"
											label="Imie"
											error={error.Name}
											onChange={handleChange}
											type="text"
										/>
									</div>
									<div className="col-lg-12">
										<FormDiv
											name="LastName"
											label="Nazwisko"
											error={error.LastName}
											onChange={handleChange}
											type="text"
										/>
									</div>
								</div>
							</div>

							<div className="col-12">
								<div className="row">
									<div className="col-lg-12">
										<FormDiv
											name="Contact"
											label="Numer telefonu"
											error={error.Contact}
											onChange={handleChange}
											type="text"
										/>
									</div>
									<div className="col-lg-12">
										<FormDiv
											name="Email"
											label="Email"
											error={error.Email}
											onChange={handleChange}
											type="text"
										/>
									</div>
								</div>
							</div>
							<div className="col-12">
								<div className="row">
									<div className="col-lg-12">
										<FormDiv
											name="Password"
											label="Hasło"
											error={error.Password}
											onChange={handleChange}
											type="password"
										/>
									</div>
									<div className="col-lg-12">
										<FormDiv
											name="Password2"
											label="Powtórz hasło"
											error={passwordError}
											onChange={handleRepeatPassword}
											type="password"
										/>
									</div>
								</div>
							</div>

							<div className="col-12">
								<SubmitFormButton label="Zarejestruj" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}

export default OwnerForm;
