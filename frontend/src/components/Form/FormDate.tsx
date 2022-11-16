function FormDate(props) {
  return (
    <div className="form-group">
      <div className="row">
        <div className="col-12">
          <label className="form-label">{props.label}</label>
        </div>

        <div className="col-12">
          <div className="row">
            <div className="co-12">
              <input
                type={props.type}
                className="form-control "
                name={props.name}
                onChange={props.onChange}
                value={props.value}
                placeholder={props.placeholder}
                min={props.min}
                disabled={props.disabled}
              />
            </div>
            <div className="col-12">
              <label className="form-text text-danger ">{props.error}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormDate;
