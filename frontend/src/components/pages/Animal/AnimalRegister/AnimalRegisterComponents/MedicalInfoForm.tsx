import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateMedicalInfo } from "../../../../../api/animalApiCalls";
import AnimalMedicalInfo from "../../../../../classes/AnimalMedicalInfo";
import FormCheck from "../../../../Form/FormCheck";
import FormDiv from "../../../../Form/FormDiv";
import FormTextField from "../../../../Form/FormTextField";
import SubmitFormButton from "../../../../General/SubmitFormButton";

function MedicalInfoForm(props) {
  const [medicalInfo, setMedicalInfo] = useState<AnimalMedicalInfo>({
    AnimalId: "",
    Chipped: null,
    Sterilized: null,
    Skeletal: "",
    Muscular: "",
    Nervous: "",
    Endocrine: "",
    Cardiovascular: "",
    Lymphatic: "",
    Respiratory: "",
    Digestive: "",
    Urinary: "",
    Reproductive: "",
    Optical: "",
    Dental: "",
    Dermalogical: "",
    Others: "",
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as { medicalInfo: AnimalMedicalInfo };
    console.log(state);
    if (state) {
      setMedicalInfo(state.medicalInfo);
    }
  }, []);

  function hanldeSubmit(e) {
    e.preventDefault();
    console.log(medicalInfo);

    const promise = updateMedicalInfo(medicalInfo);

    if (promise) {
      let response;
      promise
        .then((data) => {
          response = data;
          return response.json();
        })
        .then(
          (data) => {
            if (response.status == 201) {
              navigate(`/animals/${medicalInfo.AnimalId}`);
            }
            if (response.satus == 500) {
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
  function handleChange(e) {
    let { name, value } = e.target;

    if (name == "Sterilized" || name == "Chipped") {
      if (value == "0") {
        value = 0;
      }
      if (value == "1") {
        value = 1;
      }
    }
    setMedicalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <form
      className="container "
      onSubmit={hanldeSubmit}
      noValidate={true}
    >
      <div className="row justify-content-center ">
        <div className="col-6">
        <div className="row  card card-body shadow">
        <div className="col-12">
          <SubmitFormButton label={"Zapisz"} />
        </div>

        <div className="col-12 mt-5" style={{ overflowY: "scroll", height: "80vh" }}>
          <div className="row justify-content-between">
           
              <div className="col-3">
                <FormDiv
                label="Waga"
                onChange={handleChange}
                 type="number"
                  value={props.Weight}
                  name="Weight"
                />

              </div>

          
           
            <div className="col-3">
              <FormCheck
                label="Sterylizacja"
                name="Sterilized"
                onChange={handleChange}
                selected={medicalInfo?.Sterilized}
                elements={[
                  {
                    value: 1,
                    id: "yesS",
                    label: "Tak",
                  },

                  {
                    value: 0,
                    id: "noS",
                    label: "Nie",
                  },
                ]}
              />
           

            </div>
           
            <div className="col-3">
              <FormCheck
                label="Chip"
                name="Chipped"
                onChange={handleChange}
                selected={medicalInfo?.Chipped}
                elements={[
                  {
                    value: 1,
                    id: "yesC",
                    label: "Tak",
                  },

                  {
                    value: 0,
                    id: "noC",
                    label: "Nie",
                  },
                ]}
              />
          
            </div>
            

          

            <div className="col-12" style={{ marginTop: "10px" }}>
              <FormTextField
                label={"Układ mięśniowy"}
                name="Muscular"
                value={medicalInfo?.Muscular}
                onChange={handleChange}
              />
            </div>

            <div className="col-12" style={{ marginTop: "10px" }}>
              <FormTextField
                label={"Układ nerwowy"}
                name="Nervous"
                value={medicalInfo?.Nervous}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <FormTextField
                label={"Układ kostny"}
                name="Skeletal"
                value={medicalInfo?.Skeletal}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <FormTextField
                label={"Układ hormonalny"}
                name="Endocrine"
                value={medicalInfo?.Endocrine}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <FormTextField
                label={"Układ krążeniowy"}
                name="Cardiovascular"
                value={medicalInfo?.Cardiovascular}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <FormTextField
                label={"Układ limfatyczny"}
                name="Lymphatic"
                value={medicalInfo?.Lymphatic}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <FormTextField
                label={"Układ rozrodczy"}
                name="Reproductive"
                value={medicalInfo?.Reproductive}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <FormTextField
                label={"Układ oddechowy"}
                name="Respiratory"
                value={medicalInfo?.Respiratory}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <FormTextField
                label={"Układ trawienny"}
                name="Digestive"
                value={medicalInfo?.Digestive}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <FormTextField
                label={"Układ wydalniczy"}
                name="Urinary"
                value={medicalInfo?.Urinary}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <FormTextField
                label={"Optyka"}
                name="Optical"
                value={medicalInfo?.Optical}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <FormTextField
                label={"Dermatologia"}
                name="Dermatological"
                value={medicalInfo?.Dermalogical}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <FormTextField
                label={"Inne"}
                name="Others"
                value={medicalInfo?.Others}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
        </div>

      </div>
     
    </form>
  );
}

export default MedicalInfoForm;
