import { getCurrentUser } from "./authHelper";

export function createHttpGetOptions(haveAuth:boolean){

    let token:string|null=null;
    if(haveAuth){
        token=getCurrentUser().token;


    }

const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      'Authorization':'Bearer '+token
    }
 
  };

    return options;

}

export function createHTTPPostOptions(haveAuth:boolean,body){
    let token:string|null=null;
    if(haveAuth){
        token=getCurrentUser().token;


    }

const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization':'Bearer '+token
    },
    body:body
 
  };

    return options;
}

export function createHTTPutOptions(haveAuth:boolean,body){
    let token:string|null=null;
    if(haveAuth){
        token=getCurrentUser().token;


    }

const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'Authorization':'Bearer '+token
    },
    body:body
 
  };

    return options;
}

export function createHTTDeleteOptions(haveAuth:boolean){
    let token:string|null=null;
    if(haveAuth){
        token=getCurrentUser().token;


    }

const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      'Authorization':'Bearer '+token
    }
 
  };

    return options;
}