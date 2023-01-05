import { createHttpGetOptions } from "../utils/apiCallsHelper";
import { isAuthenticated } from "../utils/authHelper";
import { isVet } from "../utils/userType";

const baseUrl = "http://localhost:8000/owners";

export async function getOwnerById(OwnerId) {
  const ownerUrl = `${baseUrl}/${OwnerId}`;
  const options=createHttpGetOptions(isAuthenticated())
  const promise = await fetch(ownerUrl,options);

  return promise;
}

export function getOwners() {
  const options=createHttpGetOptions(isVet())
  const promise = fetch(baseUrl,options);
  
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
