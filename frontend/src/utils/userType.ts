import { UserType } from "../classes/Other";
import { getCurrentUser } from "./authHelper";

export function isOwner():boolean {
  if (getCurrentUser().userType == UserType.Owner) {
    return true;
  } else return false;
}
export function isVet():boolean {
  if (getCurrentUser().userType == UserType.Vet) {
    return true;
  } else return false;
}

export function isManager():boolean {
  if (isLogged()) {
    if (getCurrentUser().isManager == true) {
      return true;
    } else return false;
  } else return false;
}

function isLogged():boolean {
  if (getCurrentUser()) {
    return true;
  } else return false;
}

export function getUserName():string {
  if (isLogged()) {
    if (getCurrentUser().userType == UserType.Owner) {
      return "Klient";
    } else {
      if (isManager()) {
        return "Zarządca";
      } else return "Weterynarz";
    }
  }
  else return "";
}
