import FormDate from "../../../Form/FormDate";
import FormDiv from "../../../Form/FormDiv";
import SubmitFormButton from "../../../General/SubmitFormButton";

function VetMainInfo(props) {
  return (
    <div className="card card-body shadow">
      <div className="card-title">
        <h5>Informacje</h5>

        <div className="row">
          <div className="col-12">
            <FormDiv
              name="Name"
              label="Imie"
              error={props.error.Name}
              onChange={props.handleChange}
              type="text"
            />
          </div>
          <div className="col-12">
            <FormDiv
              name="LastName"
              label="Nazwisko"
              error={props.error.LastName}
              onChange={props.handleChange}
              type="text"
            />
          </div>
          <div className="col-12">
            <FormDiv
              name="Email"
              label="Email"
              error={props.error.Email}
              onChange={props.handleChange}
              type="text"
            />
          </div>
          <div className="col-12">
            <FormDiv
              name="Contact"
              label="Numer telefonu"
              error={props.error.Contact}
              onChange={props.handleChange}
              type="text"
            />
          </div>

          <div className="col-12">
            <FormDiv
              name="Password"
              label="Hasło"
              error={props.error.Password}
              onChange={props.handleChange}
              type="text"
            />
          </div>

          <div className="col-12">
            <FormDate
              name="HireDate"
              label="Data zatrudnienia"
              error={props.error.HireDate}
              onChange={props.handleChange}
              type="date"
            />
          </div>

          <div className="col-12">
            <SubmitFormButton label="Zarejestruj" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VetMainInfo;
