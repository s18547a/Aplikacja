import { ReactElement, useEffect, useState } from 'react';
import { getOwners } from '../../apiCalls/ownerApiCalls';
import Owner from '../../classes/Owner';
import FormSelect from '../../components/Form/FormSelect';

function SelectOwnerComponent({
	setServerError,
	onChange,
	error,
	selectedValue,
	editForm,
}: {
	setServerError: () => void;
	onChange: (any) => void;
	error: string;
	selectedValue: string;
	editForm: boolean;
}): ReactElement {
	const [ownerList, setOwnerList] = useState<Owner[]>([]);

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
							setServerError();
						}
					},
					(error) => {
						setServerError();
					}
				);
		}
	};

	useEffect(() => {
		getOwnerListFromApi();
	}, []);

	function onChangeFunction(e) {
		onChange(e);
	}

	return (
		<FormSelect
			label="Właściciel"
			name="OwnerId"
			onChange={onChangeFunction}
			array={ownerList}
			id={'OwnerId'}
			elementLabel={'Email'}
			error={error}
			arrayIsObjectList={true}
			selectedValue={selectedValue}
			dataListOptions="Owners"
			disabled={editForm}
		/>
	);
}

export default SelectOwnerComponent;
