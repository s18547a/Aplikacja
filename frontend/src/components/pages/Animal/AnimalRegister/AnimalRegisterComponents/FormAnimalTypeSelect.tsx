function FormAnimalTypeSelect(props) {
  function onChange(e) {
    props.onChange(e);
  }

  return (
    <div className="form-group  ">
      <div className="row">
        <div className="col-12">
          <label htmlFor="exampleDataList" className="form-label ">
            {props.label}
          </label>
        </div>

        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <input
                  className={props.error==""?"form-control ":"form-control border border-danger"}
                list={props.dataListOptions}
                id="exampleDataList"
                placeholder=""
                name="AnimalTypeId"
                onChange={onChange}
                defaultValue={props.selectedValue}
                disabled={props.disabled}
              />
              <datalist id={props.dataListOptions}>
                {props.animalTypes.map((element) => {
                  return (
                    <option
                      key={element.AnimalTypeId}
                      value={element.AnimalTypeId}
                      label={`${element.Family}, ${element.Race}`}
                    />
                  );
                })}
              </datalist>
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

export default FormAnimalTypeSelect;
