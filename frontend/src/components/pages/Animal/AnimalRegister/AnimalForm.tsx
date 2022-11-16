import { useContext, useEffect, useRef, useState } from "react";
import {
  getAnimalById,
  getAnimalTypes,
  registerAnimal,
} from "../../../api/animalApiCalls";
import { getCurrentUser } from "../../../other/authHelper";
import { useNavigate, useLocation } from "react-router-dom";

import { updateAnimal } from "../../../api/animalApiCalls";
import { getOwners } from "../../../api/ownerApiCalls";

import { isManager, isOwner, isVet } from "../../../other/userType";

import AnimalMainInfo from "./AnimalRegisterComponents/AnimalMainInfo";

import PhotoForm from "../../Shared/PhotoForm";

interface AnimalI {
  Name: undefined;
  BirthDate: undefined;
  Weight: undefined;
  OwnerId: undefined;
  Sex: undefined;

  AnimalTypeId: undefined;
  ProfileImage: undefined | null | any;
}

function AnimalRegister() {
  const [animalTypes, setAnimalTypes] = useState([]);
  const location = useLocation();

  const [editForm, setEditForm] = useState(false);
  const [ownerList, setOwnerList] = useState([]);
  const [animalId, setAnimalId] = useState("");

  const [animal, setAnimal] = useState<AnimalI>({
    Name: undefined,
    BirthDate: undefined,
    Weight: undefined,

    OwnerId: undefined,
    Sex: undefined,

    AnimalTypeId: undefined,
    ProfileImage: null,
  });

  const [error, setError] = useState({
    Name: "",
    BirthDate: "",
    Weight: "",
    AnimalTypeId: "",
    Sex: "",

    OwnerId: "",
  });

  const [serverError, setServerError] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if (isOwner()) {
      setAnimal((prev) => ({
        ...prev,
        OwnerId: getCurrentUser().userTypeId,
      }));
    }
    let response;
    let promise;

    promise = getAnimalTypes();
    if (promise) {
      promise
        .then((data) => {
          response = data;

          return response.json();
        })
        .then(
          (data) => {
            if (response.status == 500) {
              setError((prev) => ({
                ...prev,
                AnimalTypeId: "Nieudane pobranie",
              }));
            }
            if (response.status == 200) {
              setAnimalTypes(data);
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }

    if (isVet() || isManager()) {
      promise = getOwners();
      if (promise) {
        promise
          .then((data) => {
            response = data;
            return response.json();
          })
          .then(
            (data) => {
              if (response.status == 200) {
                setOwnerList(data);
              }
            },
            (error) => {
              setError((prev) => ({
                ...prev,
                OwnerId: "Nieudane pobranie",
              }));
            }
          );
      }
    }

    const state = location.state as { AnimalId: string };
    if (state != null) {
      setEditForm(true);
      setAnimalId(state.AnimalId);
      promise = getAnimalById(state.AnimalId);
      if (promise) {
        promise
          .then((data) => {
            response = data;
            return response.json();
          })
          .then(
            (data) => {
              if (response.status == 200) {
                setAnimal((prev) => ({
                  ...prev,
                  Name: data.Name,
                  BirthDate: data.BirthDate,
                  Weight: data.Weight,
                  AnimalTypeId: data.AnimalTypeId,
                  OwnerId: data.OwnerId,
                  ProfileImage: data.ProfileImage,
                  Sex: data.Sex,
                }));
              }
            },
            (error) => {
              console.log(error);
            }
          );
      }
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    let newValue = value;
    if (newValue == "false") {
      newValue = false;
    }
    if (newValue == "true") {
      newValue = true;
    }
    console.log(name + value);
    setAnimal((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    console.log(animal);
  }

  function handleDateChange(e) {
    console.log(e);
    setAnimal((prev) => ({
      ...prev,
      BirthDate: e,
    }));
  }

  function validateForm() {
    let isValid = true;

    for (const [name, value] of Object.entries(animal)) {
      error[name] = "";

      if (value === "" || value == undefined || value == null) {
        console.log(name);
        if (name != "ProfileImage") {
          setError((prevErrors) => ({
            ...prevErrors,
            [name]: "Puste pole",
          }));
          isValid = false;
        }
      }
    }
    return isValid;
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted");
    console.log(animal);
    if (validateForm()) {
      console.log("IsValid");
      let newAnimal;

      let response;
      let promise;
      if (editForm) {
        newAnimal = { ...animal, AnimalId: animalId };
        console.log(newAnimal);
        promise = updateAnimal(newAnimal);
      } else {
        newAnimal = animal;
        promise = registerAnimal(newAnimal);
      }

      if (promise) {
        promise
          .then((data) => {
            response = data;
            return response.json();
          })
          .then(
            (data) => {
              if (response.status === 201) {
                if (!editForm) {
                  navigate("/animals", { state: { id: data.newId } });
                } else {
                  navigate(`/animals/${animalId}`);
                }
              }
            },
            (error) => {
              console.log(error);
            }
          );
      }
    }
  }

  function setPhoto(preview) {
    console.log(preview);
    setAnimal((prev) => ({
      ...prev,
      ProfileImage: preview,
    }));
  }

  return (
    <form className="container " onSubmit={handleSubmit} noValidate style={{}}>
      <div className="row">
        <div className="col-4">
          <PhotoForm
            setPhoto={setPhoto}
            preview={animal.ProfileImage}
            editForm={editForm}
          />
        </div>

        <div className="col-8">
          <AnimalMainInfo
            ownerList={ownerList}
            handleChange={handleChange}
            error={error}
            animal={animal}
            location={animal}
            animalTypes={animalTypes}
            editForm={editForm}
            handleDateChange={handleDateChange}
          />
        </div>
      </div>
    </form>
  );
}

export default AnimalRegister;
