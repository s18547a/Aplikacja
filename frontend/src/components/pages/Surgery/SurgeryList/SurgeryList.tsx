import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getReservationsByVetId,
  getReservationsByOwner,
  getReservations,
  cancelReservation,
} from "../../../api/reservationApiCalls";
import { cancelSurgery, getSurgeries } from "../../../api/surgeryApiCalls";
import Surgery from "../../../classes/Surgery";
import RegiserSuccessInfo from "../../../List/RegisterSuccessInfo";

import TableOrEmpty from "../../../List/TableOrEmpty";
import Modal from "../../../Modal/Modal";
import ModalEnableBtn from "../../../Modal/ModalEnableBtn";
import { getCurrentUser } from "../../../other/authHelper";
import { isVet, isOwner, isManager } from "../../../other/userType";

function SurgeryList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [newId, setNewId] = useState("");

  const [surgeryList, setSurgeryList] = useState<Surgery[]>([]);

  const [empty, setEmpty] = useState<boolean>(false);

  async function loadSurgeryList() {
    const currentUserId = getCurrentUser().userTypeId;

    let response;
    let promise;

    if (isVet() || isManager()) {
      promise = getSurgeries();
    }
    if (isOwner()) {
      promise = getReservationsByOwner(currentUserId);
    }

    if (promise) {
      promise
        .then((data) => {
          response = data;
          return response.json();
        })
        .then(
          (data) => {
            if (response.status == 200) {
              setSurgeryList(data);
              setEmpty(false);
            }
            if (response.status == 404) {
              setEmpty(true);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  useEffect(() => {
    loadSurgeryList();

    const state = location.state as { id: string };
    if (state != null) {
      setNewId(state.id);
    }
  }, []);


  

 

  return (
    <div className="container">
      
      <RegiserSuccessInfo newId={newId} message={"Nowy zabieg: "} />

      <div className="card card-body shadow">
        <h5 className="card-title">Zabiegi</h5>
        <TableOrEmpty Empty={empty}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Weterynarz</th>
                <th>Data</th>
                <th>Godzina</th>
                <th>Rodzaj</th>
                <th>Zwierzę</th>
                
              </tr>
            </thead>

            <tbody>
              {surgeryList.map((surgery) => {
                return (
                  <tr
                    onClick={() => {
                      navigate(`/surgeries/${surgery.SurgeryId}`);
                    }}
                  >
                    <td>{`${surgery.Vet.Name} ${surgery.Vet.LastName}`}</td>
                    <td>{surgery.Date}</td>
                    <td>{surgery.StartTime}</td>
                    <td>{surgery.SurgeryType}</td>
                    <td>{surgery.Animal.Name}</td>
                   
                  </tr>
                  
                );
              })}
            </tbody>
          </table>
        </TableOrEmpty>
      </div>
    </div>
  );
}

export default SurgeryList;
