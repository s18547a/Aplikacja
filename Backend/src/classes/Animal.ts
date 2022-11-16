import AnimalType from "./AnimalType";

export enum Sex {
  UNKNOWN,
  MALE,
  FEMALE,
}

class Animal {
  AnimalId: string | null;
  Name: string;
  BirthDate: string;
  Weight: number;

  OwnerId: string;
  ProfileImage: string | null;
  Sex: Sex;

  AnimalTypeId: number;
  AnimalType: AnimalType;

  constructor(
    AnimalId: string | null,
    Name: string,
    BirthDate: string,
    Weight: number,

    OwnerId: string,
    ProfileImage: string | null,
    Sex: number,

    AnimalTypeId: number,
    AnimalType: AnimalType
  ) {
    this.AnimalId = AnimalId;
    this.Name = Name;
    this.BirthDate = BirthDate;
    this.Weight = Weight;

    this.OwnerId = OwnerId;
    this.ProfileImage = ProfileImage;
    this.Sex = Sex;

    this.AnimalTypeId = AnimalTypeId;
    this.AnimalType = AnimalType;
  }

 /**
  * name
  */


}

export default Animal;
