import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { cancelSurgery, getSurgery, updateSurgeryReport } from "../../../api/surgeryApiCalls";
import Surgery from "../../../classes/Surgery";
import Modal from "../../../Modal/Modal";
import ModalEnableBtn from "../../../Modal/ModalEnableBtn";
import { getCurrentUser } from "../../../other/authHelper";
import ProfileDiv from "../../../other/ProfileDiv";
import { isManager } from "../../../other/userType";
import SurgeryReportForm from "../SurgeryRegister/SurgeryReportForm";

function SurgeryProfile(props) {
  const [surgery, setSurgery] = useState<Surgery>();
  const [editReport, setEditReport] = useState(false);
  const [report, setReport] = useState("");
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  const param = useParams();
  useEffect(() => {
    const surgeryId = param.SurgeryId;
    console.log(surgeryId);
    let response;
    getSurgery(surgeryId)
      .then((data) => {
        response = data;
        return data.json();
      })
      .then(
        (data) => {
          if (response.status == 200) {
            setSurgery(data);
            setReport(data.Report);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  useEffect(() => {
    const surgeryId = param.SurgeryId;
    console.log(surgeryId);
    let response;
    getSurgery(surgeryId)
      .then((data) => {
        response = data;
        return data.json();
      })
      .then(
        (data) => {
          if (response.status == 200) {
            setSurgery(data);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }, [reload]);

  function onReportChange(e) {
    const value = e.target.value;
    setReport(value);
  }

  function saveEditReport() {
    let response;
    updateSurgeryReport(report, surgery?.SurgeryId)
      .then((data) => {
        response = data;
        return data.json();
      })
      .then(
        (data) => {
          if (response.status == 201) {
            navigate(`/surgeries/${surgery?.SurgeryId}`);
            setEditReport(false);
            setReload(true);
          } else console.log(data);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  const handleClick = (event) => {
   
    let result;
    cancelSurgery(surgery?.SurgeryId)
      .then((res) => {
        result = res;
        return res.json();
      })
      .then((data) => {
        navigate('/surgeries')
      });
  };

  const saveEditButton = (
    <button
      onClick={saveEditReport}
      className="btn btn-primary btn-sm"
      style={{ background: "green" }}
    >
      Zapisz
    </button>
  );
  const starteditButton = (
    <button
      onClick={() => {
        setEditReport(true);
      }}
      className="btn btn-primary btn-sm"
      style={{ background: "green" }}
    >
      Edytuj
    </button>
  );
  const reportButton = !editReport ? starteditButton : saveEditButton;
  const reportContent = editReport ? (
    <SurgeryReportForm onChange={onReportChange} value={report} />
  ) : (
    <div>{report}</div>
  );

  const deleteButton = <ModalEnableBtn
  id={"cancelSurgery"}
  className="btn btn-sm btn-danger"
  label="Anuluj"
  function={null}
  value={surgery?.SurgeryId}
/>

  return (
    <div className="container">
        <Modal
        id={"cancelSurgery"}
        function={handleClick}
        label={"Czy na pewno?"}
      />
      <div className="">
        <div className="row">
          <div className="col-lg-4 ">
            <div className="card card-body shadow">
              <ProfileDiv label={"Data"} value={surgery?.Date} />
              <ProfileDiv label={"Rodzaj"} value={surgery?.SurgeryType} />
              <ProfileDiv
                label={"Weterynarz"}
                value={`${surgery?.Vet.Name} ${surgery?.Vet.LastName}`}
              />

              <div className="row ">
                <div className="col-4">
                  <p className=" ">{"Operowany"}</p>
                </div>
                <div className="col-6">
                  <p
                    className="text-muted"
                    style={{ color: "black" }}
                    onClick={() => {
                      navigate(`/animals/${surgery?.Animal.AnimalId}`);
                    }}
                  >
                    {surgery?.Animal.Name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card card-body shadow">
              <div className="card-title">
                <h5>Opis</h5>
              </div>
              <div>{surgery?.Description}</div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card card-body shadow">
              <div className="row">
                <div className="col-6">
                  <div className="card-title">
                    <h5>Raport z operacji</h5>
                  </div>
                </div>
                <div className="col-3">
                  {surgery?.LeadVetId == getCurrentUser().userId || isManager()
                    ? reportButton
                    : null}
                   
                </div>
                <div className="col-3">
                {surgery?.LeadVetId == getCurrentUser().userId || isManager()
                    ? surgery?.Report==""||surgery?.Report==null? deleteButton:null
                    
                    : null}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12">{reportContent}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SurgeryProfile;
