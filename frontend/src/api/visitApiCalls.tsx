const baseURL = "http://localhost:8000/visits";

export async function getVisitList() {
  const promise = await fetch(baseURL);

  return promise;
}

export async function getVisitListByOwner(OwnerId) {
  const url = `${baseURL}?OwnerId=${OwnerId}`;

  const promise = await fetch(url);
  return promise;
}

export async function getVisitById(VisitId) {
  const url = `${baseURL}/${VisitId}`;

  const promise = await fetch(url);

  return promise;
}

export async function getVisitListByAnimal(Name) {
  const url = `${baseURL}?Name=${Name}`;
  const promise = await fetch(url);

  return promise;
}

export async function registerVisit(Visit) {
  const stringVisit = JSON.stringify(Visit);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: stringVisit,
  };
  console.log("SENDED");
  const promise = await fetch(baseURL, options);

  return promise;
}

export async function getMedicalAtivities() {
  const url = "http://localhost:8000/visits/activities";

  const promise = await fetch(url);

  return promise;
}