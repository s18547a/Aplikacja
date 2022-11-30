import { type } from "os";
import { useState } from "react";

function FormDiv(props) {
  return (
    <div className="form-group">
      <div className="row">
        <div className="col-12">
          <label className="form-label">{props.label}</label>
        </div>

        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <input
                type={props.type}
                className={props.error==""||props.error==undefined?"form-control ":"form-control border border-danger"}
                name={props.name}
                onChange={props.onChange}
                value={props.value}
                placeholder={props.placeholder}
                min={props.min}
                disabled={props.disabled}
                step={props.type == "number" ? 0.01 : undefined}
                lang={"pl-PL"}
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

export default FormDiv;
