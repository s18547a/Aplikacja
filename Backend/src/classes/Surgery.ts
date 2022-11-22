import Animal from './Animal';
import Vet from './Vet';

class Surgery {
    SurgeryId: string;
    Date: string;
    SurgeryType: string;
    LeadVetId: string;
    Description: string | null;
    AnimalId: string;
    Report:string|null;
    StartTime:string;
    Vet:Vet;
    Animal:Animal;
 
    constructor(
        SurgeryId: string,
        Date: string,
        SurgeryType: string,
        LeadVetId: string,
        Description: string | null,
        AnimalId: string,
        Report:string|null,
        StartTime:string,
        Vet:Vet,
        Animal:Animal,
  
    ) {
        this.SurgeryId = SurgeryId;
        this.Date = Date;
        this.SurgeryType = SurgeryType;
        this.LeadVetId = LeadVetId;
        this.Description = Description;
        this.AnimalId = AnimalId;
        this.Report=Report;
        this.StartTime=StartTime;
        this.Animal=Animal;
        this.Vet=Vet;

    }
}

export default Surgery;
