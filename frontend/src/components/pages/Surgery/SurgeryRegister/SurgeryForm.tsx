import { useEffect, useState } from "react";
import { getSurgeryTypes, registerSurgery } from "../../../../api/surgeryApiCalls";
import {
  getValiableHourForSurgery,
  getVetBySurgeryType,
  getVetDaysOfWeek,
} from "../../../../api/vetApiCalls";
import Animal from "../../../../classes/Animal";
import SurgeryType from "../../../../classes/SurgeryType";
import Vet from "../../../../classes/Vet";
import FormSelectLimit from "../../../Form/FormSelectLimit";
import SelectOwnerComponent from "../../Shared/SelectOwnerComponent";
import SelectAnimalComponent from "../../Shared/SelectAnimalComponent";
import VetChoiceComponent from "../../Shared/VetChoiceComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pl from "date-fns/locale/pl";
import { useNavigate } from "react-router-dom";
import FormTextField from "../../../Form/FormTextField";
import FormDiv from "../../../Form/FormDiv";
import ProfileDiv from "../../../other/ProfileDiv";
interface SurgeryI {
  OwnerId: string;
  Date: string;
  SurgeryType: string;
  LeadVetId: string;

  AnimalId: string;

  Description: string | null;
  StartTime: string;
}
function SurgeryForm() {
  const [surgeryTypes, setSurgeryTypes] = useState<SurgeryType[]>([]);

  const [animalList, setAnimalList] = useState<Animal[]>([]);
  const [surgery, setSurgery] = useState<SurgeryI>({
    OwnerId: "",
    Date: "",
    SurgeryType: "",
    LeadVetId: "",

    AnimalId: "",

    Description: "",
    StartTime: "",
  });
  const [error, setError] = useState({
    Date: "",
    SurgeryType: "",
    LeadVetId: "",

    AnimalId: "",
    OwnerId: "",
    StartTime: "",
    Description: "",
  });
  const [vets, setVets] = useState<Vet[]>([]);
  const [availableHours, setAvailableHours] = useState<string[]>([]);

  useEffect(() => {
    getTypesFromApi();
  }, []);

  const getTypesFromApi = () => {
    let results;
    let promise = getSurgeryTypes();
    if (promise) {
      promise
        .then((res) => {
          results = res;
          return res.json();
        })
        .then(
          (data) => {
            if (results.status == 200) {
              setSurgeryTypes(data);
            }
          },
          (error) => {
            setError((prev) => ({
              ...prev,
              SurgeryType: "Błąd",
            }));
          }
        );
    }
  };
  function onChangeOwner(e) {
    e.preventDefault();
    setAnimalList([]);
    setError((prev) => ({
      ...prev,
      AnimalId: "",
    }));
    const { name, value } = e.target;
    setSurgery((prev) => ({
      ...prev,
      OwnerId: value,
    }));
  }

  function onChange(e) {
    const { name, value } = e.target;

    setSurgery((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const [surgeryPriece, setSurgeryPriece] = useState(0);

  function onChangeType(e) {
    const { name, value } = e.target;
    setVets([]);

    setSurgery((prev) => ({
      ...prev,
      [name]: value,
      LeadVetId: "",
      Date: "",
    }));
    const selectedTypePriece = surgeryTypes.filter((x) => {
      return x.SurgeryType == value;
    })[0].Price;
    console.log(surgeryTypes);
    setSurgeryPriece(selectedTypePriece);
    setavailableDaysList([]);
    setavailableDaysListError("");

    let results;
    getVetBySurgeryType(value)
      .then((res) => {
        results = res;
        return res.json();
      })
      .then(
        (data) => {
          if (results.status == 200) {
            setVets(data);
          }
        },
        (error) => {
          return error;
        }
      );
  }
  const [availableDayList, setavailableDaysList] = useState<String[]>([]);
  const [availableDayListError, setavailableDaysListError] = useState("");
  function onChangeVet(e) {
    const { name, value } = e.target;

    setAvailableHours([]);
    setSurgery((prev) => ({
      ...prev,
      LeadVetId: value,
      Date: "",
    }));

    let response;
    let promise;
    promise = getVetDaysOfWeek(value);
    if (promise) {
      promise
        .then((data) => {
          response = data;
          return data.json();
        })
        .then((data) => {
          if (response.status == 200) {
            setavailableDaysList(data);
            console.log(data);
          }
          if (response.status == 404) {
            setavailableDaysListError("Weterynarz nie przyjmuje");
            console.log(404);
          } else {
            setavailableDaysListError("Błąd");
          }
        }, error);
    }
  }

  const navigate = useNavigate();
  function handleHourChange(e) {
    const { name, value } = e.target;
    setSurgery((prev) => ({
      ...prev,
      StartTime: value,
    }));
  }
  function handleSubmit(e) {
    e.preventDefault();

    console.log(surgery);
    if (validateForm()) {
      console.log(surgery);

      let response;
      registerSurgery(surgery)
        .then((data) => {
          response = data;
          return data.json();
        })
        .then(
          (data) => {
            if (response.status == 201) {
              navigate("/surgeries", { state: { id: data.newId } });
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

    for (const [name, value] of Object.entries(surgery)) {
      error[name] = "";

      if (value === "" || value == undefined || value == null) {
        setError((prevErrors) => ({
          ...prevErrors,
          [name]: "Puste pole",
        }));

        isValid = false;
      }
    }
    return isValid;
  }
  function setAPIError(value: any, errorField: any) {
    setError((prev) => ({
      ...prev,
      [errorField]: value,
    }));
  }

  function handleReactDatePicker(e) {
    const date: String = e.toISOString().split("T")[0];

    setSurgery((prev) => ({
      ...prev,
      Date: date.toString(),
    }));

    let promise;
    promise = getValiableHourForSurgery(date, surgery.LeadVetId);
    if (promise) {
      let results;
      promise
        .then((data) => {
          results = data;
          return data.json();
        })
        .then(
          (data) => {
            console.log(data);
            if (results.status == 200) {
              setAvailableHours(data);
            } else if (results.status == 404) {
              setError((prev) => ({
                ...prev,
                StartTime: "Brak wyników",
              }));
            } else {
              setError((prev) => ({
                ...prev,
                StartTime: "Błąd",
              }));
            }
          },
          (error) => {
            setError((prev) => ({
              ...prev,
              StartTime: error,
            }));
          }
        );
    }
  }

  const filterDate = (e) => {
    const day = new Date(e).toLocaleDateString("en-EN", { weekday: "long" });

    return availableDayList.includes(day);
  };

  return (
    <form className="container " onSubmit={handleSubmit}>
      <div className="row ">
        <div className="col-4  offset-4">
          <div className="row card card-body shadow">
            <div className="col-12">
              <SelectOwnerComponent
                onChange={onChangeOwner}
                error={error.OwnerId}
                OwnerId={surgery.OwnerId}
              />
            </div>

            <div className="col-12">
              <SelectAnimalComponent
                onChange={onChange}
                error={error.AnimalId}
                OwnerId={surgery.OwnerId}
                setAPIError={setAPIError}
              />
            </div>
            <div className="col-12">
              <FormSelectLimit
                label="Kategoria"
                name="SurgeryType"
                onChange={onChangeType}
                array={surgeryTypes}
                id={"SurgeryType"}
                elementLabel="SurgeryType"
                error={error.SurgeryType}
                arrayIsObjectList={true}
              />
            </div>
            <div className="col-12">
              <ProfileDiv label="Cena:" value={`${surgeryPriece} zł`} />
            </div>

            <div className="col-12">
              <VetChoiceComponent
                label={"Prowadzący"}
                selected={surgery.LeadVetId}
                onChange={onChangeVet}
                vets={vets}
              />
            </div>

            <div className="col-12">
              <div className="form-group">
                <div className="form-label">
                  <p>Data</p>
                </div>
                <div>
                  <DatePicker
                    className={"form-control"}
                    onChange={handleReactDatePicker}
                    filterDate={filterDate}
                    locale={pl}
                    name="date"
                    selected={
                      surgery.Date == "" ? null : new Date(surgery.Date)
                    }
                    dateFormat="yyyy-MM-dd"
                    onKeyDown={(e) => {
                      e.preventDefault();
                    }}
                  />
                </div>
                <div>
                  <label className="form-text text-danger ">{error.Date}</label>
                </div>
              </div>
            </div>

            <div className="col-12">
              <FormSelectLimit
                label="Godzina"
                name="StartTime"
                onChange={handleHourChange}
                array={availableHours}
                id={"element"}
                elementLabel={"element"}
                error={error.StartTime}
                arrayIsObjectList={false}
                selectedValue={""}
                selected={false}
              />
            </div>
            <div className="col-12">
              <FormTextField
                label="Opis"
                name={"Description"}
                onChange={onChange}
                error={error.Description}
              />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary ">
                Zarezerwuj
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SurgeryForm;
