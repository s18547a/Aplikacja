function VisitActivitiesForm(props) {
  function changeActivity(e) {
    props.changeActivity(e);
  }
  return (
    <div className="card card-body shadow">
      <div className="card-title">
        <h5 className="form-label">Czynności</h5>
      </div>

      <div className="" key={props.AnimalId}>
        {props.medicalActivities.map((mA) => {
          return (
            <div className="form-check">
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
              >{`${mA.ActivityName}, cena: ${mA.Price}zł`}</label>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VisitActivitiesForm;
