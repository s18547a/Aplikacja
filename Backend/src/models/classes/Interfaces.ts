export interface  AnimalParametersType {
  OwnerId: string;
  
  Email: string;
}

export interface GetOwnerParamters {
   
    AnimalId: string;
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
   
    VetType: string;
  }

  
export interface GetVisitPrarameters {
    AnimalId: string;
    VetId: string;
   
    OwnerId: string;
    Name: string;
  }

export interface IllnessCuredParameters {
    AnimalId: string;
    Description: string;
    VisitId: string;
    RecoveryDate: string;
  }

export interface getVetTypesParameters {
    VetId: string;
  }