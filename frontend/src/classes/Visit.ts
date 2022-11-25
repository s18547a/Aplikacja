import Animal from "./Animal";
import MedicalActivity from "./MedicalActivity";
import Vet from "./Vet";

class Visit {
  VisitId: string;
  VetId: string;
  AnimalId: string;
  Date: string;
  Hour: String;
  Note: string;
  Bill: number;
  MedicalActivities: MedicalActivity[];
  Vet: Vet;
  Animal: Animal;

  constructor(
    VisitId: string,
    VetId: string,
    AnimalId: string,
    Date: string,
    Hour: String,
    Note: string,
    Bill: number,
    MedicalActivities: MedicalActivity[],
    Vet: Vet,
    Animal: Animal
  ) {
    this.VisitId = VisitId;
    this.VetId = VetId;
    this.AnimalId = AnimalId;
    this.Date = Date;
    this.Hour = Hour;
    this.Note = Note;
    this.Bill = Bill;
    this.MedicalActivities = MedicalActivities;
    this.Vet = Vet;
    this.Animal = Animal;
  }
}

export default Visit;
