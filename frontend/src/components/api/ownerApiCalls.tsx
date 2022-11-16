const baseUrl = "http://localhost:8000/owners";

export async function getOwnerById(OwnerId) {
  const ownerUrl = `${baseUrl}/${OwnerId}`;

  const promise = await fetch(ownerUrl);

  return promise;
}

export function getOwners() {
  const promise = fetch(baseUrl);

  return promise;
}

export function registerOwnerApiCall(Owner) {
  const owner = JSON.stringify(Owner);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: owner,
  };
  const promise = fetch(baseUrl, options);
  return promise;
}
