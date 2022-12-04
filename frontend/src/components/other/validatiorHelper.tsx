
export function checkIfAllFieldAsFilled(formObject){

    for (const [name,value] of Object.entries(formObject)){
            if(!value){

                return false;
            }
    }

    return true;


}