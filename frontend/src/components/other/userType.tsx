import { UserType } from "../../classes/Other";
import { getCurrentUser } from "./authHelper";

export function isOwner() {
  if (getCurrentUser().userType == UserType.Owner) {
    return true;
  } else return false;
}
export function isVet() {
  if (getCurrentUser().userType == UserType.Vet) {
    return true;
  } else return false;
}

export function isManager() {
  if (isLogged()) {
    if (getCurrentUser().isManager == true) {
      return true;
    } else return false;
  } else return false;
}

function isLogged() {
  if (getCurrentUser()) {
    return true;
  } else return false;
}

export function getUserName() {
  if (isLogged()) {
    if (getCurrentUser().userType == UserType.Owner) {
      return "Klient";
    } else {
      if (isManager()) {
        return "Zarządca";
      } else return "Weterynarz";
    }
  }
}
