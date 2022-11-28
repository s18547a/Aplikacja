function FormSelectLimit(props) {
  function onChange(e) {
    props.onChange(e);
  }

  return (
    <div className="row">
      <div className="col-12">
        <div className="col-lg-3 col-md-12">
          <label htmlFor="exampleDataListA" className="form-label ">
            {props.label}
          </label>
        </div>
      </div>
      <div className="col-12">
        <select name={props.name} onChange={onChange}   className={props.error==""?"form-select ":"form-select border border-danger"}>
          <option value="" disabled selected>
            Wybierz
          </option>

          {props.array.map((element) => {
            return props.arrayIsObjectList ? (
              <option
                key={element[props.id]}
                value={element[props.id]}
                label={element[props.elementLabel]}
                selected={
                  props.selected
                    ? props.selectedValue == element[props.id]
                      ? true
                      : false
                    : undefined
                }
              />
            ) : (
              <option key={element} value={element} label={element} />
            );
          })}
        </select>
      </div>
      <div className="col-12">
        <label className="form-text text-danger ">{props.error}</label>
      </div>
    </div>
  );
}

export default FormSelectLimit;
