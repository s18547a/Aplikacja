import { ReactElement } from 'react';

function RegisterSuccessBannerComponent(props): ReactElement {
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

export default RegisterSuccessBannerComponent;
