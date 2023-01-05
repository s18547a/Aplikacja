import { createHTTDeleteOptions, createHttpGetOptions, createHTTPPostOptions } from "../utils/apiCallsHelper";
import { isAuthenticated } from "../utils/authHelper";
import { getCurrentDate } from "../utils/getCurrentDate";
import { isVet } from "../utils/userType";

const baseUrl = "http://localhost:8000/reservations";

export function registerReservation(reservation) {
  const reservationString = JSON.stringify(reservation);



  const options=createHTTPPostOptions(isAuthenticated(),reservationString)
  const promise = fetch(baseUrl, options);

  return promise;
}

export async function getReservations() {
  const options=createHttpGetOptions(isVet());
  const promise = await fetch(baseUrl,options);

  return promise;
}

export function getReservationsByOwner(OwnerId) {
  const options=createHttpGetOptions(isAuthenticated());
  const url = `${baseUrl}?OwnerId=${OwnerId}`;

  const promise = fetch(url,options);
  return promise;
}

export function getReservationsByVetId(VetId) {
  const options=createHttpGetOptions(isVet());
  const url = `${baseUrl}?VetId=${VetId}`;

  const promise = fetch(url,options);
  return promise;
}

export function getTodayReservationsByVetId(VetId) {
  const options=createHttpGetOptions(isVet());
  const url = `${baseUrl}?VetId=${VetId}&Date=${getCurrentDate()}`;
  const promise = fetch(url,options);
  return promise;
}

export function cancelReservation(ReservationId) {
  const options = createHTTDeleteOptions(isAuthenticated());
  const url = `${baseUrl}/${ReservationId}`;
  

  const promise = fetch(url, options);

  return promise;
}
