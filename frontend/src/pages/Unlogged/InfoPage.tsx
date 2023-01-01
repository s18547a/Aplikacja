import { ReactElement, useEffect, useState } from 'react';
import { getClinicSchedulde } from '../../apiCalls/clinicInfoApiCalls';

import ScheduldeRow from './ScheduldeRow';

function InfoPage(): ReactElement {
	const [schedulde, setSchedulde] = useState<{
		Monday: string | undefined;
		Tuesday: string | undefined;
		Wednesday: string | undefined;
		Thursday: string | undefined;
		Friday: string | undefined;
		Saturday: string | undefined;
		Sunday: string | undefined;
	}>({
		Monday: undefined,
		Tuesday: undefined,
		Wednesday: undefined,
		Thursday: undefined,
		Friday: undefined,
		Saturday: undefined,
		Sunday: undefined,
	});

	useEffect(() => {
		let results;
		getClinicSchedulde()
			.then((res) => {
				results = res;
				return res.json();
			})
			.then(
				(data) => {
					setSchedulde(data);
				},
				(error) => {
					console.log(error);
				}
			);
	}, []);

	return (
		<div className="container ">
			<div className="row justify-content-center">
				<div className="col-lg-6">
					<div className="card card-body  border-0 shadow">
						<ScheduldeRow label="Poniedziałek" day={schedulde.Monday} />
						<ScheduldeRow label="Wtorek" day={schedulde.Tuesday} />
						<ScheduldeRow label="Środa" day={schedulde.Wednesday} />
						<ScheduldeRow label="Czwartek" day={schedulde.Thursday} />
						<ScheduldeRow label="Piątek" day={schedulde.Friday} />
						<ScheduldeRow label="Sobota" day={schedulde.Saturday} />
						<ScheduldeRow label="Niedziela" day={schedulde.Sunday} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default InfoPage;
