import { isOwner } from "../../../other/userType";

function AnimalIllnesses(props) {
  function updateIllness(e) {
    e.preventDefault();
    const { name, value } = e.target;

    props.updateIllness(value);
  }

  return (
    <div className="card card-body border-0">
      <table className="table table-hover">
        <thead className="">
          <tr>
            <th>Diagnoza</th>
            <th>Zdiagnozowano</th>
            <th>Wyleczono</th>
            <th>Stan</th>
          </tr>
        </thead>
        <tbody>
          {props.illnessList.map((illness) => {
            return (
              <tr>
                <td>{illness?.Description}</td>
                <td className="">{illness?.DiagnosisDate}</td>
                <td>{illness?.RecoveryDate}</td>
                <td>
                  {illness?.RecoveryDate == null ? (
                    isOwner() ? (
                      <a className="btn btn-danger">Niewyleczone</a>
                    ) : (
                      <button
                        value={JSON.stringify(illness)}
                        onClick={updateIllness}
                        className="btn btn-danger"
                      >
                        Niewyleczone
                      </button>
                    )
                  ) : (
                    <a className="btn btn-success">Wyleczone</a>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AnimalIllnesses;
