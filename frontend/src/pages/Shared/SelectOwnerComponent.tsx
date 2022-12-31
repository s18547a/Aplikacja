import { useEffect, useState } from 'react';
import { getOwners } from '../../api/ownerApiCalls';
import Owner from '../../classes/Owner';
import FormSelect from '../../components/Form/FormSelect';

function SelectOwnerComponent(props) {
	const [ownerList, setOwnerList] = useState<Owner[]>([]);
	const [error, setError] = useState();

	const getOwnerListFromApi = () => {
		let promise;
		let response;
		promise = getOwners();
		if (promise) {
			promise
				.then((data) => {
					response = data;
					return data.json();
				})
				.then(
					(data) => {
						if (response.status === 200) {
							console.log(data);
							setOwnerList(data);
						}
						if (response.status == 500) {
							props.setServerError();
						}
					},
					(error) => {
						props.setServerError();
					}
				);
		}
	};

	useEffect(() => {
		getOwnerListFromApi();
	}, []);

	function onChange(e) {
		props.onChange(e);
	}

	return (
		<FormSelect
			label="Właściciel"
			name="OwnerId"
			onChange={onChange}
			array={ownerList}
			id={'OwnerId'}
			elementLabel={'Email'}
			error={props.error}
			arrayIsObjectList={true}
			selectedValue={props.selectedValue}
			dataListOptions="Owners"
			disabled={props.editForm}
		/>
	);
}

export default SelectOwnerComponent;
