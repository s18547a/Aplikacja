import AnimalType from "./AnimalType";

enum Sex {
  UNKNOWN,
  MALE,
  FEMALE,
}

class Animal {
  AnimalId: string | null;
  Name: string;
  BirthDate: string;
  

  OwnerId: string;
  ProfileImage: string | null;
  Sex: Sex;

  AnimalTypeId: string;
  AnimalType: AnimalType;

  constructor(
    AnimalId: string | null,
    Name: string,
    BirthDate: string,
    

    OwnerId: string,
    ProfileImage: string | null,
    Sex: number,

    AnimalTypeId: string,
    AnimalType: AnimalType
  ) {
    this.AnimalId = AnimalId;
    this.Name = Name;
    this.BirthDate = BirthDate;
   

    this.OwnerId = OwnerId;
    this.ProfileImage = ProfileImage;
    this.Sex = Sex;

    this.AnimalTypeId = AnimalTypeId;
    this.AnimalType = AnimalType;
  }
}

export default Animal;
