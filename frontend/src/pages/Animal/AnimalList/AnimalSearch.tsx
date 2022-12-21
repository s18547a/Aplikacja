import { useState } from 'react';
import SearchButton from '../../../components/Buttons/SearchButton';
import FormSearchDiv from '../../../components/Form/FormSearchDiv';

function AnimalSearch(props) {
	const [searchParameters, setSearchParamteters] = useState({
		Email: '',
	});

	function onChange(e) {
		console.log(e);
		const { name, value } = e.target;

		setSearchParamteters((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function onSearch(e) {
		e.preventDefault();

		props.onSearch(searchParameters.Email);
		setSearchParamteters(() => ({
			Email: '',
		}));
	}

	return (
		<form className=" card card-body shadow" onSubmit={onSearch}>
			<div className=" row justify-content-center">
				<div className="col-auto">
					<FormSearchDiv
						label={'Email właściciela'}
						name={'Email'}
						onChange={onChange}
						value={searchParameters.Email}
					/>
				</div>

				<div className="col-auto">
					<SearchButton />
				</div>
			</div>
		</form>
	);
}

export default AnimalSearch;
