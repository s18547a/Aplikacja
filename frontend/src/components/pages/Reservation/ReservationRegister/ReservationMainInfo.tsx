import { useState } from "react";
import FormDiv from "../../../Form/FormDiv";
import FormSelect from "../../../Form/FormSelect";
import { getCurrentDate } from "../../../other/getCurrentDate";
import { isVet, isManager } from "../../../other/userType";
import SelectOwnerComponent from "../../Shared/SelectOwnerComponent";

function ReservationMainInfo(props) {
  function handleOwnerChange(e) {
    props.handleOwnerChange(e);
  }
  function handleDateChange(e) {
    props.handleDateChange(e);
  }
  const [min, setMin] = useState(getCurrentDate());

  const selectOwner = (
    <SelectOwnerComponent
      onChange={handleOwnerChange}
      error={props.error.OwnerId}
    />
  );

  return (
    <div className="card card-body shadow">
      <div className="row">
        <div className="col-12">
          {isVet() || isManager() ? selectOwner : null}
        </div>

        <div className="col-12">
          <FormDiv
            name="day"
            label="Data"
            error={props.error.Date}
            onChange={handleDateChange}
            type="date"
            min={min}
          />
        </div>
      </div>
    </div>
  );
}

export default ReservationMainInfo;
