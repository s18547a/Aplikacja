export interface  AnimalParametersType {
  OwnerId: string;
  
  Email: string;
}

export interface GetOwnerParamters {
   
    AnimalId: String;
  }

 export interface GetReservationParameters {
    VetId: string;
    Date: string;
    OwnerId: string|null;
  }

  export interface GetScheduldeParamters {
    Date: string;
    VetId: string;
    isSurgery:boolean;
  }

  export interface getSurgeryPrameters {
 
    OwnerId:string;
    VetId:string,
    Date:string
  }

  export interface GetVetParameters {
    Date: string;
   
    VetType: String;
  }

  
export interface GetVisitPrarameters {
    AnimalId: string;
    VetId: string;
   
    OwnerId: string;
    Name: string;
  }

  export interface IllnessCuredParameters {
    AnimalId: String;
    Description: String;
    VisitId: String;
    RecoveryDate: String;
  }

  export interface getVetTypesParameters {
    VetId: string;
  }