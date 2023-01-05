import { ReactElement } from 'react';
import Vet from '../../../classes/Vet';
import { getCurrentUser } from '../../../utils/authHelper';
import VetInfo from './VetInfo';
import VetSchedulde from './VetSchedulde';
import VetSpec from './VetSpec';

function VetProfileTab({
	types,
	vet,
	vetId,
	setServerError,
}: {
	types: any[];
	vet: Vet;
	vetId: string | undefined;
	setServerError: (any) => void;
}): ReactElement {
	return (
		<div className="">
			<div className="row">
				<div className="col-lg-9">
					<div className="row">
						<div className="col-12">
							<VetInfo vet={vet} />
						</div>
						<div className="col-12">
							<VetSpec types={types} />
						</div>
					</div>
				</div>

				<div className="col-lg-3">
					<VetSchedulde
						VetId={vetId == undefined ? getCurrentUser().userTypeId : vetId}
						setServerError={setServerError}
					/>
				</div>
			</div>
		</div>
	);
}

export default VetProfileTab;
