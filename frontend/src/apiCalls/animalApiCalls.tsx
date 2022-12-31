import AnimalMedicalInfo from "../classes/AnimalMedicalInfo";
import { getCurrentUser, isAuthenticated } from "../components/other/authHelper";

const baseUrl = "http://localhost:8000/animals";

export function getAnimalTypes() {
  const url = `${baseUrl}/types`;

  const promise = fetch(url);
  return promise;
}

export function getAnimals() {
  const url = baseUrl;

  const promise = fetch(url);
  return promise;
}

export function registerAnimal(Animal) {
  const url = baseUrl;
  const animal = JSON.stringify(Animal);

  let token=null
  if(isAuthenticated()){
    token=getCurrentUser().token;
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization':'Bearer '+token
    },
    body: animal,
  };
  const promise = fetch(url, options);
  return promise;
}

export async function getAnimalsbyOwner(OwnerId) {
  const url = `${baseUrl}?OwnerId=${OwnerId}`;
  const promise = await fetch(url);
  return promise;
}

export async function getAnimalById(AnimalId: String) {
  const url = `${baseUrl}/${AnimalId}`;
  const promise = await fetch(url);

  return promise;
}
export async function getAnimalsByOwnerEmail(Email) {
  const url = `${baseUrl}?Email=${Email}`;

  const promise = await fetch(url);

  return promise;
}

export function updateAnimal(Animal) {
  console.log(Animal);
  const url = baseUrl;
  const stringifyAnimal = JSON.stringify(Animal);
 
  const token= isAuthenticated()?getCurrentUser().token:null

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Authorization':'Bearer '+token
    },
    body: stringifyAnimal,
  };

  const promise = fetch(url, options);
  return promise;
}

const illnessesUrl = `${baseUrl}/illnesses`;

export async function getAnimalIllnesses(AnimalId) {
  const url = `${baseUrl}/${AnimalId}/illnesses`;

  const promise = await fetch(url);

  return promise;
}

export async function setRecoveryIllness(Illness) {
  const stringIllness = JSON.stringify(Illness);
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: stringIllness,
  };

  const promise = await fetch(illnessesUrl, options);

  return promise;
}
const animalMedInfoURL = `${baseUrl}/medicalInfo`;

export async function getAnimalMedicalInfo(AnimalId: String) {
  const url = `${baseUrl}/${AnimalId}/medicalInfo`;
  const promise = await fetch(url);

  return promise;
}

export async function updateMedicalInfo(AnimalMedicalInfo: AnimalMedicalInfo) {
  const stringifyAMI = JSON.stringify(AnimalMedicalInfo);
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: stringifyAMI,
  };
  const promise = await fetch(animalMedInfoURL, options);

  return promise;
}

const vaccineUrl = "http://localhost:8000/vaccines";

export async function getAnimalVaccines(AnimalId) {
  const url = `${vaccineUrl}/${AnimalId}`;

  const promise = await fetch(url);

  return promise;
}

export async function getAnimalCoreVaccines(AnimalId) {
  const url = `${vaccineUrl}/core/${AnimalId}`;

  const promise = await fetch(url);

  return promise;
}

export async function getAnimalUnadminstratedVaccines(AnimalId) {
  console.log(AnimalId);
  const url = `${vaccineUrl}/types?unAdministratedAnimalId=${AnimalId}`;

  const promise = await fetch(url);

  return promise;
}
