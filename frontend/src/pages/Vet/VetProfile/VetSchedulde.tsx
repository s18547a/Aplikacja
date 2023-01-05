import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVetSchedulde } from '../../../apiCalls/vetApiCalls';
import EditButton from '../../../components/Buttons/EditButton';
import { isManager } from '../../../utils/userType';

interface ScheduldeI {
	Monday: string | null | undefined;
	Tuesday: string | null | undefined;
	Wednesday: string | null | undefined;
	Thursday: string | null | undefined;
	Friday: string | null | undefined;
	Saturday: string | null | undefined;
	Sunday: string | null | undefined;
}

function VetSchedulde({
	VetId,
	setServerError,
}: {
	VetId: string;
	setServerError: (any) => void;
}) {
	const [schedulde, setSchedulde] = useState<ScheduldeI>({
		Monday: undefined,
		Tuesday: undefined,
		Wednesday: undefined,
		Thursday: undefined,
		Friday: undefined,
		Saturday: undefined,
		Sunday: undefined,
	});
	const navigate = useNavigate();
	useEffect(() => {
		let response;
		let promise;

		promise = getVetSchedulde(VetId);
		if (promise) {
			promise
				.then((data) => {
					response = data;
					return response.json();
				})
				.then(
					(data) => {
						if (response.status == 200) {
							setSchedulde(data);
						}

						if (response.status == 404) {
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
	}, []);

	return (
		<div className="card card-body shadow ">
			<div className="card-title">
				<div className="row">
					<div className="col-12">
						<div className="row mb-3">
							<div className="col-auto">
								<h5>Grafik</h5>
							</div>
							<div className="col-auto">
								{isManager() ? (
									<EditButton
										onClick={() => {
											navigate(`/vets/${VetId}/schedulde/edit`);
										}}
									/>
								) : null}
							</div>
						</div>
					</div>

					<div className="col-12">
						<div className="row">
							<div className="col-5">
								<p>Poniedziałek</p>
							</div>
							<div className="col-7">
								<p>
									{schedulde.Monday == null ? 'Nie pracuje' : schedulde.Monday}
								</p>
							</div>
						</div>
					</div>

					<div className="col-12">
						<div className="row">
							<div className="col-5">
								<p>Wtorek</p>
							</div>
							<div className="col-7">
								<p>
									{schedulde.Tuesday == null
										? 'Nie pracuje'
										: schedulde.Tuesday}
								</p>
							</div>
						</div>
					</div>

					<div className="col-12">
						<div className="row">
							<div className="col-5">
								<p>Środa</p>
							</div>
							<div className="col-7">
								<p>
									{schedulde.Wednesday == null
										? 'Nie pracuje'
										: schedulde.Wednesday}
								</p>
							</div>
						</div>
					</div>

					<div className="col-12">
						<div className="row">
							<div className="col-5">
								<p>Czwartek</p>
							</div>
							<div className="col-7">
								<p>
									{schedulde.Thursday == null
										? 'Nie pracuje'
										: schedulde.Thursday}
								</p>
							</div>
						</div>
					</div>

					<div className="col-12">
						<div className="row">
							<div className="col-5">
								<p>Piątek</p>
							</div>
							<div className="col-7">
								<p>
									{schedulde.Friday == null ? 'Nie pracuje' : schedulde.Friday}
								</p>
							</div>
						</div>
					</div>

					<div className="col-12">
						<div className="row">
							<div className="col-5">
								<p>Sobota</p>
							</div>
							<div className="col-7">
								<p>
									{schedulde.Saturday == null
										? 'Nie pracuje'
										: schedulde.Saturday}
								</p>
							</div>
						</div>
					</div>

					<div className="col-12">
						<div className="row">
							<div className="col-5">
								<p>Niedziela</p>
							</div>
							<div className="col-7">
								<p>
									{schedulde.Sunday == null ? 'Nie pracuje' : schedulde.Sunday}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VetSchedulde;
