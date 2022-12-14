import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logInApiCall } from '../../apiCalls/userApiCalls';
import FormDiv from '../../components/Form/FormDiv';
import ServerErrorInfoComponenet from '../../components/InfoBanners/ServerErrorInfoBannerComponent';

function LoginForm({
	handleLogin,
}: {
	handleLogin: (any) => void;
}): ReactElement {
	const [loginForm, editLoginForm] = useState({ Email: '', Password: '' });
	const [error, setError] = useState({ Email: '', Password: '' });

	const [serverError, setServerError] = useState(false);

	function handleChange(e): any {
		const { name, value } = e.target;
		console.log(name);
		editLoginForm((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function handleSubmit(e) {
		e.preventDefault();

		console.log(loginForm);
		if (validateForm()) {
			let response;
			let promise;
			promise = logInApiCall(loginForm);
			if (promise) {
				promise
					.then((data) => {
						response = data;
						return response.json();
					})
					.then(
						(data) => {
							if (response.status == 404 || response.status == 401) {
								setError((prev) => ({
									...prev,
									Email: 'Niepoprawny email lub hasło',
								}));
							}
							if (response.status == 200) {
								const user = JSON.stringify(data);

								handleLogin(user);
							}
							if (response.status == 500) {
								setServerError(true);
							}
						},
						(error) => {
							setServerError(true);
							console.log(error);
						}
					);
			}
		}
	}
	function validateForm(): boolean {
		let isValid = true;
		for (const [name, value] of Object.entries(loginForm)) {
			error[name] = '';
			console.log(name + ' ' + value);
			if (value == '' || value == null || value == undefined) {
				isValid = false;
				setError((prev) => ({
					...prev,
					[name]: 'Puste pole',
				}));
				console.log(error[name]);
			}
		}

		return isValid;
	}

	return (
		<form onSubmit={handleSubmit} className="">
			<div className="row justify-content-center">
				<ServerErrorInfoComponenet serverError={serverError} />
				<div className="col-6">
					<div className="card card-body  border-0 shadow">
						<div className="row justify-content-center">
							<div className="col-12">
								<FormDiv
									name="Email"
									label="Email"
									error={error.Email}
									onChange={handleChange}
									type="text"
								/>
							</div>
						</div>
						<div className="row justify-content-center">
							<div className="col-12">
								<FormDiv
									name="Password"
									label="Hasło"
									error={error.Password}
									onChange={handleChange}
									type={'password'}
								/>
							</div>
						</div>

						<div className="row mt-3">
							<div className="col-1">
								<button
									type="submit"
									className="btn btn-primary"
									style={{ background: 'green' }}
								>
									Zaloguj
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}

export default LoginForm;
