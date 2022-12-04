import { useEffect, useState } from "react";
import { getAnimalsbyOwner } from "../../../api/animalApiCalls";
import Animal from "../../../classes/Animal";
import FormCheck from "../../Form/FormCheck";
import FormSelect from "../../Form/FormSelect";

function SelectAnimalComponent(props) {
  const [animalList, setAnimalList] = useState<Animal[]>([]);

  function setAPIError(value, errorField) {
    props.setAPIError(value, errorField);
  }

  const getAnimalListFromApi = (OwnerId: String) => {
    if (props.OwnerId) {
      let promise;
      let response;

      promise = getAnimalsbyOwner(OwnerId);
      if (promise) {
        promise
          .then((data) => {
            response = data;
            return data.json();
          })
          .then(
            (data) => {
              if (response.status === 200) {
                setAnimalList(data);
              }
              if (response.status === 404) {
                setAPIError("Brak wyników", "AnimalId");
                setAnimalList([]);
              }
              if (response.status === 500) {
                setAPIError("Błąd serwera", "AnimalId");
                setAnimalList([]);
              }
            },
            (error) => {
              console.log(error);
              setAPIError(error, "AnimalId");
              setAnimalList([]);
            }
          );
      }
    }
  };

  useEffect(() => {
    getAnimalListFromApi(props.OwnerId);
  }, [props.OwnerId]);

  function onChange(e) {
    props.onChange(e);
  }

  return (
    <div>
      <div className="form-group">
        <div className="form-label fw-bold">Zwierzę</div>
        {animalList.map((animal) => {
          return (
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="radio"
                name="AnimalId"
                id={`${animal.AnimalId}`}
                value={`${animal.AnimalId}`}
                onChange={onChange}
              />
              <label
                className="form-check-label"
                htmlFor={`${animal.AnimalId}`}
              >
                {animal.Name}
              </label>
            </div>
          );
        })}
      </div>
      <label className="form-text text-danger ">{props.error}</label>
    </div>
  );
}

export default SelectAnimalComponent;
