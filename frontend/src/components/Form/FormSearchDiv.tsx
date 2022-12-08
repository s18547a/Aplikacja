function FormSearchDiv(props) {
    return (
      <div className="form-group">
        <div className="align-items-center d-flex ">
         
          
         
  
          
                <input
                  type={props.type}
                  className={"form-control form-control-sm"}
                  name={props.name}
                  onChange={props.onChange}
                  value={props.value}
                  placeholder={props.label}
                  min={props.min}
                  disabled={props.disabled}
                  step={props.type == "number" ? 0.01 : undefined}
                  lang={"pl-PL"}
                />
          
        </div>
      </div>
    );
  }

  export default FormSearchDiv