function DayScheduldeComponenet(props) {
  function handleChange(e) {
    props.onChange(e);
  }

  function handleCheckBoxChange(e) {
    props.onCheckBoxChange(e);
  }

  return (
    <div className="form-group">
      <div className="row justify-content-center mb-1">
        <div className="col-6">
          <label className="form-label">{props.day}</label>{" "}
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-3">
              <input
                className="form-control"
                name={`start${props.name}`}
                type="time"
                value={props.value == "" ? null : props.value.split("-")[0]}
                onChange={handleChange}
              />
            </div>
            <div className="col-1">
              <h5>-</h5>
            </div>

            <div className="col-3">
              <input
                className="form-control"
                name={`end${props.name}`}
                type="time"
                value={props.value == "" ? null : props.value.split("-")[1]}
                onChange={handleChange}
              />
            </div>
            <div className="col-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name={props.name}
                  value={""}
                  onChange={props.onCheckBoxChange}
                  checked={props.isFree == true}
                />
                <label className="form-check-label">Wolne</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <label className="form-text text-danger ">{props.error}</label>
        </div>
      </div>
    </div>
  );
}

export default DayScheduldeComponenet;
