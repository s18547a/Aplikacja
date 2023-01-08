import { url } from "inspector";
import SurgeryType from "../classes/SurgeryType";
import { createHttpGetOptions, createHTTPPostOptions, createHTTPutOptions } from "../utils/apiCallsHelper";
import { isAuthenticated } from "../utils/authHelper";
import { isManager, isVet } from "../utils/userType";

const baseUrl = "http://localhost:8000/vets";

export async function getVets() {
  const options = createHttpGetOptions(isVet());
  const promise = await fetch(baseUrl,options);

  return promise;
}

export async function getVetByVetId(VetId) {
  const url = `${baseUrl}/${VetId}`;
  const options = createHttpGetOptions(isVet());
  const promise = await fetch(url,options);

  return promise;
}

export async function getVetBySurgeryType(SurgeryType: string) {
  const url = `${baseUrl}?VetType=${SurgeryType}`;
  const options = createHttpGetOptions(isVet());
  const promise = await fetch(url,options);

  return promise;
}

export async function getVetTypes() {
  const url = `${baseUrl}/types`;
  const options = createHttpGetOptions(isManager());
  const promise = await fetch(url,options);

  return promise;
}

export async function registerVet(Vet) {
  const vet = JSON.stringify(Vet);

  const options=createHTTPPostOptions(isManager(),vet);
  const promise = await fetch(baseUrl, options);

  return promise;
}
  export async function updateVet(Vet) {
    const vet = JSON.stringify(Vet);
   
    const options = createHTTPutOptions(isManager(),vet);
  const promise = await fetch(baseUrl, options);

  return promise;
}

export function getVetsOnDay(Day) {
  const url = `http://localhost:8000/vets?Date=${Day}`;
  const options = createHttpGetOptions(isAuthenticated());
  const promise = fetch(url,options);

  return promise;
}

const baseUrlSchedulde = "http://localhost:8000/vets/schedulde";

export async function getValiableHours(Day, VetId) {
  const options = createHttpGetOptions(isAuthenticated());
  const url = `${baseUrlSchedulde}/availableHours?Date=${Day}&VetId=${VetId}&isSurgery=false`;

  const promise = await fetch(url,options);

  return promise;
}
export async function getValiableHourForSurgery(Day, VetId) {
  const url = `${baseUrlSchedulde}/availableHours?Date=${Day}&VetId=${VetId}&isSurgery=true`;
  const options = createHttpGetOptions(isVet());
  const promise = await fetch(url,options);

  return promise;
}

export async function getVetSchedulde(VetId) {
  const url = `${baseUrl}/${VetId}/schedulde`;
  const options = createHttpGetOptions(isVet());
  const promise = await fetch(url,options);

  return promise;
}

export async function getVetDaysOfWeek(VetId) {
  const url = `${baseUrl}/${VetId}/daysOfWeek`;
  const options = createHttpGetOptions(isAuthenticated());
  const promise = await fetch(url,options);
  return promise;
}

export async function updateSchedulde(updatedSchedulde) {
  const scheduldeStr = JSON.stringify(updatedSchedulde);
  const optios = createHTTPutOptions(isManager(),scheduldeStr);
  
  const promise = await fetch(baseUrlSchedulde, optios);

  return promise;
}

export async function  getFullSchedulde() {
  
  const url=`${baseUrlSchedulde}/full`;
  const options=createHttpGetOptions(isManager());
  const promise = await fetch(url,options)
  return promise;
  
}
