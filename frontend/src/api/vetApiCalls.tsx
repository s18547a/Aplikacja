import { url } from "inspector";
import SurgeryType from "../classes/SurgeryType";

const baseUrl = "http://localhost:8000/vets";

export async function getVets() {
  const promise = await fetch(baseUrl);

  return promise;
}

export async function getVetByVetId(VetId) {
  const url = `${baseUrl}/${VetId}`;
  const promise = await fetch(url);

  return promise;
}

export async function getVetBySurgeryType(SurgeryType: string) {
  const url = `${baseUrl}?VetType=${SurgeryType}`;

  const promise = await fetch(url);

  return promise;
}

export async function getVetTypes() {
  const url = `${baseUrl}/types`;
  const promise = await fetch(url);

  return promise;
}

export async function registerVet(Vet) {
  const vet = JSON.stringify(Vet);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: vet,
  };
  const promise = await fetch(baseUrl, options);

  return promise;
}
  export async function updateVet(Vet) {
    const vet = JSON.stringify(Vet);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: vet,
    };

  const promise = await fetch(baseUrl, options);

  return promise;
}

export function getVetsOnDay(Day) {
  const url = `http://localhost:8000/vets?Date=${Day}`;

  const promise = fetch(url);

  return promise;
}

const baseUrlSchedulde = "http://localhost:8000/vets/schedulde";

export async function getValiableHours(Day, VetId) {
  const url = `${baseUrlSchedulde}/availableHours?Date=${Day}&VetId=${VetId}&isSurgery=false`;

  const promise = await fetch(url);

  return promise;
}
export async function getValiableHourForSurgery(Day, VetId) {
  const url = `${baseUrlSchedulde}/availableHours?Date=${Day}&VetId=${VetId}&isSurgery=true`;

  const promise = await fetch(url);

  return promise;
}

export async function getVetSchedulde(VetId) {
  const url = `${baseUrl}/${VetId}/schedulde`;

  const promise = await fetch(url);

  return promise;
}

export async function getVetDaysOfWeek(VetId) {
  const url = `${baseUrl}/${VetId}/daysOfWeek`;

  const promise = await fetch(url);
  return promise;
}

export async function updateSchedulde(updatedSchedulde) {
  const scheduldeStr = JSON.stringify(updatedSchedulde);
  const optios = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: scheduldeStr,
  };
  const promise = await fetch(baseUrlSchedulde, optios);

  return promise;
}
