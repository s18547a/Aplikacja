import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../other/authHelper";
import { getMedicalAtivities, registerVisit } from "../../../../api/visitApiCalls";

import Animal from "../../../../classes/Animal";
import VisitActivitiesForm from "./VisitActivitesForm";
import DiagnosisForm from "./DiagnosisForm";
import VisitMainInfoForm from "./VisitMainInfoForm";
import VisitVaccineForm from "./VisitVaccineForm";
import { cancelReservation } from "../../../../api/reservationApiCalls";
import Reservation from "../../../../classes/Reservation";
import { getAnimalUnadminstratedVaccines } from "../../../../api/animalApiCalls";
import VaccineType from "../../../../classes/VaccineType";

interface VisitI {
  Date: string;
  VetId: number;
  OwnerId: string;
  AnimalId: string;
  Hour: string;
  Note: string | null;
  Bill: number;
  MedicalActivities: number[];
  DiagnosisList: [];
  VaccineList: string[];
  ReservationId: string;
}

interface MedicalActivitiyI {
  MedicalActivityId: number;
  ActivityName: string;
  Price: number;
}

function VisitRegister() {
  const location = useLocation();
  const navigate = useNavigate();
  const [visit, setVisit] = useState<VisitI>({
    Date: "",
    VetId: getCurrentUser().userId,
    OwnerId: "",
    AnimalId: "",
    Hour: "",
    Note: null,
    Bill: 0,
    MedicalActivities: [],
    DiagnosisList: [],
    VaccineList: [],
    ReservationId: "",
  });

  const [medicalActivities, setMedicalActivities] = useState<
    MedicalActivitiyI[]
  >([]);

  const [animalList, setAnimalList] = useState<Animal[]>([]);

  const [error, setError] = useState({
    Date: "",
    VetId: "",
    AnimalId: "",
    Hour: "",
    Note: "",
    OwnerId: "",
  });

  useEffect(() => {
    let promise;
    let response;
    promise = getMedicalAtivities();
    if (promise) {
      promise
        .then((data) => {
          response = data;
          return response.json();
        })
        .then(
          (data) => {
            if (response.status == 200) {
              setMedicalActivities(data);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
    const state = location.state as {
      ReservationId: string;
      Date: string;
      Hour: string;
      OwnerId: string;
    };
    if (state) {
      setReservedId(state.ReservationId);
      setRealised(true);
      setVisit((prev) => ({
        ...prev,
        Date: state.Date,
        Hour: state.Hour,
        OwnerId: state.OwnerId,
      }));
    }
  }, []);
  const [realised,setRealised]=useState(false);
  const [reservedId, setReservedId] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    if (name == "AnimalId" || name == "OwnerId") {
      setVisit((prev) => ({
        ...prev,
        MedicalActivities: [],
        Bill: 0,
        VaccineList: [],
        DiagnosisList: [],
      }));
    }
    setVisit((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(visit);
  }

  function onChangeOwner(e) {
    e.preventDefault();
    setAnimalList([]);
    setError((prev) => ({
      ...prev,
      AnimalId: "",
    }));

    const { name, value } = e.target;
    setVisit((prev) => ({
      ...prev,
      OwnerId: value,
      AnimalId: "",
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(visit);
    if (validateForm()) {
      let result;

      const newVisit = visit;
      newVisit.ReservationId = reservedId;
      console.log(newVisit);
      registerVisit(newVisit)
        .then((res) => {
          result = res;
          return res.json();
        })
        .then(
          (data) => {
            if (result.status == 201) {
              navigate("/visits",{ state: { id: data.newId } });
            } else {
              console.log(error);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  function validateForm() {
    let isValid = true;

    for (const [name, value] of Object.entries(visit)) {
      error[name] = "";

      if (name != "ReservationId") {
        if (name != "Note" && (value === "" || value == null)) {
          setError((prevErrors) => ({
            ...prevErrors,
            [name]: "Puste pole",
          }));
          isValid = false;
        }
        if (name == "Hour" && value != "" && value != null) {
          const regex = "[0-2][0-9]:[0-5][0-9]";
          const match = value.match(regex);
          if (match == null) {
            setError((prevErrors) => ({
              ...prevErrors,
              [name]: "Niepoprawny format",
            }));
            isValid = false;
          } else {
            const hourArray = value.split(":");

            if (hourArray[1] > 59 || hourArray[0] > 23) {
              setError((prevErrors) => ({
                ...prevErrors,
                [name]: "Niepoprawny format",
              }));
              isValid = false;
            }
          }
        }
      }
    }
    return isValid;
  }

  function setDiagnosisList(value) {
    setVisit((prev) => ({
      ...prev,
      DiagnosisList: value,
    }));
  }

  function changeActivity(e) {
    const { name, value } = e.target;

    console.log(value);

    if (!visit.MedicalActivities.includes(value)) {
      for (const [nameMedAct, medAct] of Object.entries(medicalActivities)) {
        if (medAct.MedicalActivityId == value) {
          const newBill = visit.Bill + medAct.Price;

          visit["Bill"] = newBill;
          const newMedicalActivites = visit.MedicalActivities;
          newMedicalActivites.push(value);
          setVisit((prev) => ({
            ...prev,
            MedicalActivities: newMedicalActivites,
          }));
        }
      }
    } else {
      for (const [nameMedAct, medAct] of Object.entries(medicalActivities)) {
        if (medAct.MedicalActivityId == value) {
          const newBill = visit.Bill - medAct.Price;

          visit["Bill"] = newBill;
          let newMedicalActivites = visit.MedicalActivities;
          newMedicalActivites = newMedicalActivites.filter((arrval) => {
            if (arrval != value) {
              return true;
            }
          });
          setVisit((prev) => ({
            ...prev,
            MedicalActivities: newMedicalActivites,
          }));
        }
      }
    }
  }

  function changeVaccine(e) {
    const { name, value } = e.target;
    console.log(value);
    console.log(visit.VaccineList);

    let vacList = visit.VaccineList;
    if (!vacList.includes(value)) {
      vacList.push(value);
    } else {
      vacList = vacList.filter((vac) => {
        return !(value != vac);
      });
    }

    setVisit((prev) => ({
      ...prev,
      VaccineList: vacList,
    }));
  }

  function setAPIError(value, errorField) {
    setError((prev) => ({
      ...prev,
      [errorField]: value,
    }));
  }
  const [vaccineList, setVaccineList] = useState<VaccineType[]>([]);

  async function getAnimalUnadminstratedVaccinesApiCall(AnimalId) {
    if (visit.AnimalId) {
      let results;
      getAnimalUnadminstratedVaccines(AnimalId)
        .then((data) => {
          results = data;

          return data.json();
        })
        .then(
          (data) => {
            if (results.status == 200) {
              setVaccineList(data);
            }
            if (results.status == 404) {
              setVaccineList([]);
            }
            if (results.status == 500) {
            }
          },
          (error) => {}
        );
    }
  }
  useEffect(() => {
    getAnimalUnadminstratedVaccinesApiCall(visit.AnimalId);
  }, [visit.AnimalId]);

  return (
    <form className=" container " onSubmit={handleSubmit}>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="row justify-content-center">
            <div className="col-8">
              <VisitMainInfoForm
                onChange={onChange}
                onChangeOwner={onChangeOwner}
                setAPIError={setAPIError}
                error={error}
                visit={visit}
                editForm={realised}
                
              />
            </div>
          </div>
         
        </div>
        <div className="col-lg-4">
          <div className="row">
            <div className="col-12 mb-4">
              <VisitActivitiesForm
                changeActivity={changeActivity}
                medicalActivities={medicalActivities}
                AnimalId={visit.AnimalId}
                selectedActivites={visit.MedicalActivities}
              />
            </div>
            <div className="col-12">
              <VisitVaccineForm
                AnimalId={visit.AnimalId}
                onChange={changeVaccine}
                vaccineList={vaccineList}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <DiagnosisForm
                setDiagnosisList={setDiagnosisList}
                AnimalId={visit.AnimalId}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default VisitRegister;
