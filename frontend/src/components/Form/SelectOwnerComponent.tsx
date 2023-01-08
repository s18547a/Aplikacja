import { ReactElement, useEffect, useState } from 'react';
import { getOwners } from '../../apiCalls/ownerApiCalls';
import Owner from '../../classes/Owner';
import FormSelect from './FormSelect';
import FormSelectReact from './FromSelectReact';

function SelectOwnerComponent({
	setServerError,
	onChange,
	error,
	selectedValue,
	editForm,
	realised,
}: {
	setServerError: () => void;
	onChange: (any) => void;
	error: string;
	selectedValue: any;
	editForm: boolean;
	realised: boolean;
}): ReactElement {
	const [ownerList, setOwnerList] = useState<
		{ value: string; label: string }[]
	>([]);

	const createOptionsForReactSelect = (ownerList: Owner[]) => {
		let optionList: { value: string; label: string }[] = [];
		if (ownerList) {
			ownerList.forEach((element) => {
				const option: { value: string; label: string } = {
					value: element.OwnerId as string,
					label: `${element.Email}`,
				};

				optionList.push(option);
			});

			setOwnerList(optionList);
		}
	};
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
							createOptionsForReactSelect(data);
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
		<FormSelectReact
			name={'OwnerId'}
			onChange={onChangeFunction}
			disabled={realised}
			options={ownerList}
			label={'Właściciel'}
			error={error}
			selectedValue={selectedValue}
			editForm={editForm}
		/>
	);
}

export default SelectOwnerComponent;
