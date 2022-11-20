import Vaccination from "../../../classes/Vaccination";
import TableOrEmpty from "../../../List/TableOrEmpty";

function AnimalVaccines(props) {
  return (
    <div className="card card-body border-0 ">
      <div className="row">
        <div className="col-lg-9 ">
          <div className="card-title">
            <h5>Historia szczepień</h5>
          </div>
          <TableOrEmpty Empty={props.vaccineList.length == 0}>
            <table className="table">
              <thead>
                <tr>
                  <th>Szczepionka</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {props.vaccineList.map((vaccination) => {
                  return (
                    <tr>
                      <td>{vaccination.VaccineType}</td>
                      <td>{vaccination.Date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableOrEmpty>
        </div>

        <div className="col-lg-3 ">
          <div className="card-title">
            <h5 className=" text-danger">Szczepienia obowiazkowe</h5>
          </div>
          {props.coreList.lenght != 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>{"Szczepionka"}</th>
                </tr>
              </thead>

              <tbody>
                {props.coreList.map((vaccine) => {
                  return (
                    <tr>
                      <td>{vaccine.VaccineType}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="alert-success">
              <div>Wykonano wszystkie obowiązkowe</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnimalVaccines;
