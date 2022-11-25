const baseUrl = "http://localhost:8000/clinicInfo";

export async function getClinicSchedulde() {
  const url = `${baseUrl}/schedulde`;
  const promise = await fetch(url);

  return promise;
}
