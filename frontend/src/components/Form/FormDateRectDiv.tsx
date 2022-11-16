import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";
function FormDateReactDiv(props) {
  function onChange(e) {
    const date: String = e.toISOString().split("T")[0];
    props.onChange(date);
  }

  return (
    <div className="form-group">
      <div className="row">
        <div className="col-12">
          <label className="form-label">{props.label}</label>
        </div>

        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <DatePicker
                className={"form-control"}
                onChange={onChange}
                filterDate={props.filter}
                locale={pl}
                name="date"
                value={props.value}
                dateFormat="yyyy-MM-dd"
                showMonthDropdown
                showYearDropdown
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
export default FormDateReactDiv;
