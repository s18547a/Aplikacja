function FormCheck(props) {
  function handleChange(e) {
    props.onChange(e);
  }

  return (
    <div className="form-check">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-6">
              <label className="form-label">{props.label}</label>
            </div>
            <div className="col-6">
              <label className="form-text text-danger">{props.error}</label>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="row">
            {props.elements.map((element) => {
              return (
                <div className="col-12">
                  <div className="form-check ">
                    <input
                      name={props.name}
                      type="radio"
                      id={element.id}
                      value={element.value}
                      className="form-check-input"
                      onChange={handleChange}
                      checked={props.selected == element.value}
                    />
                    <label htmlFor={element.id} className="form-check-label">
                      {element.label}
                   
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormCheck;
