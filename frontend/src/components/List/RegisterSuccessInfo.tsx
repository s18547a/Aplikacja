import { ReactElement } from 'react';

function RegiserSuccessInfo(props): ReactElement {
	return (
		<div>
			{props.newId != '' ? (
				<div className="alert alert-success ">
					{props.message}
					{props.newId}
				</div>
			) : null}
		</div>
	);
}

export default RegiserSuccessInfo;
