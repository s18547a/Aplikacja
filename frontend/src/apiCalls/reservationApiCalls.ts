import { getCurrentDate } from "../components/other/getCurrentDate";

const baseUrl = "http://localhost:8000/reservations";

export function registerReservation(reservation) {
  const reservationString = JSON.stringify(reservation);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: reservationString,
  };
  const promise = fetch(baseUrl, options);

  return promise;
}

export async function getReservations() {
  const promise = await fetch(baseUrl);

  return promise;
}

export function getReservationsByOwner(OwnerId) {
  const url = `${baseUrl}?OwnerId=${OwnerId}`;

  const promise = fetch(url);
  return promise;
}

export function getReservationsByVetId(VetId) {
  const url = `${baseUrl}?VetId=${VetId}`;

  const promise = fetch(url);
  return promise;
}

export function getTodayReservationsByVetId(VetId) {
  const url = `${baseUrl}?VetId=${VetId}&Date=${getCurrentDate()}`;
  const promise = fetch(url);
  return promise;
}

export function cancelReservation(ReservationId) {
  const url = `${baseUrl}/${ReservationId}`;
  console.log(url);
  const options = {
    method: "DELETE",
  };

  const promise = fetch(url, options);

  return promise;
}
