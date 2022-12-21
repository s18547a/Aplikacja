function VetSpecForm(props) {
  function handleChange(e) {
    props.handleChange(e);
  }

  return (
    <div className="card card-body shadow">
      <div className="card-title">
        <h5>Specjalizacje</h5>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="">
            {props.vetTypeList.map((type) => {
              return (
                <div className="form-check">
                  <input
                    className="form-check-input"
                    onChange={handleChange}
                    type="checkbox"
                    value={type.VetType}
                    id="flexCheckDefault"
                    checked={props.vetTypes.includes(type.VetType)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {type.VetType}
                  </label>{" "}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VetSpecForm;
