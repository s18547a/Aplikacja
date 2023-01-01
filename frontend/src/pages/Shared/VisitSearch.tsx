import { ReactElement, useState } from 'react';
import SearchButton from '../../components/Buttons/SearchButton';
import FormSearchDateDiv from '../../components/Form/FormSearchDateDiv';
import FormSearchDiv from '../../components/Form/FormSearchDiv';
import { SearchListParamter } from '../../components/other/helperClass/VisitListParameters';

function VisitSearch({ onSearch }: { onSearch: (any) => void }): ReactElement {
	const [searchParameters, setSearchParamteters] = useState({
		Name: '',
		Email: '',
		Date: '',
	});

	function onChange(e): void {
		console.log(e);
		const { name, value } = e.target;

		setSearchParamteters((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	function onSearchFuntion(e): void {
		e.preventDefault();
		const visitListParametersInstance = new SearchListParamter();
		visitListParametersInstance.setEmail(searchParameters.Email);
		visitListParametersInstance.setDate(searchParameters.Date);
		visitListParametersInstance.setName(searchParameters.Name);
		onSearch(visitListParametersInstance);
		setSearchParamteters(() => ({
			Name: '',
			Email: '',
			Date: '',
		}));
	}

	return (
		<form className=" card card-body shadow" onSubmit={onSearchFuntion}>
			<div className=" row justify-content-center">
				<div className="col-auto">
					<FormSearchDiv
						label={'Zwierzę'}
						name={'Name'}
						onChange={onChange}
						value={searchParameters.Name}
					/>
				</div>
				<div className="col-auto">
					<FormSearchDiv
						label={'Weterynarz'}
						name={'Email'}
						onChange={onChange}
						value={searchParameters.Email}
					/>
				</div>
				<div className="col-auto">
					<FormSearchDateDiv
						value={searchParameters.Date}
						name="Date"
						onChange={onChange}
						label={'Data'}
						error=""
						dateFormat="yyyy-MM-dd"
						locale={'pl'}
					/>
				</div>
				<div className="col-auto">
					<SearchButton />
				</div>
			</div>
		</form>
	);
}

export default VisitSearch;
