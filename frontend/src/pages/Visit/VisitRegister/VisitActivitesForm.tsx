import MedicalActivity from '../../../classes/MedicalActivity';

function VisitActivitiesForm({
	AnimalId,
	medicalActivities,
	changeActivity,
}: {
	AnimalId: string;
	medicalActivities: MedicalActivity[];
	changeActivity: (any) => void;
}) {
	return (
		<div className="card card-body shadow">
			<div className="card-title">
				<h5 className="form-label">Czynności</h5>
			</div>

			<div className="" key={AnimalId}>
				{medicalActivities.map((mA) => {
					return (
						<div
							className="form-check"
							id={mA.MedicalActivityId}
							key={mA.MedicalActivityId}
						>
							<input
								className="form-check-input"
								onChange={changeActivity}
								type="checkbox"
								value={mA.MedicalActivityId}
								id={`${mA.MedicalActivityId}/`}
							/>
							<label
								className="form-check-label"
								htmlFor={`${mA.MedicalActivityId}/`}
							>{`${mA.ActivityName}, cena: ${mA.Price}zł`}</label>{' '}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default VisitActivitiesForm;
