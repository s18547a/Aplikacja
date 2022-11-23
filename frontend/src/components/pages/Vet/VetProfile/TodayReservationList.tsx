import { useEffect, useState } from "react";
import TableOrEmpty from "../../../../components/List/TableOrEmpty";

function TodayReservationList(props) {
  const [reservationList, setReservationList] = useState([]);
  useEffect(() => {
    const propsList = props.list;
    setReservationList(propsList);
  });

  return (
    <div className="row">
      <div className="card card-body border-0 shadow">
        <div className="card-title">
          <h5>Dzisiejsze rezerwacje</h5>
          <div className="row">
            <div className="col-12">
              <TableOrEmpty Empty={props.list.length == 0 ? true : false}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Godzina</th>
                      <th>Klient</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.list.map((reservationRow) => {
                      return (
                        <tr>
                          <td>{reservationRow.Hour}</td>
                          <td>{reservationRow.Owner?.Email}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </TableOrEmpty>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodayReservationList;
