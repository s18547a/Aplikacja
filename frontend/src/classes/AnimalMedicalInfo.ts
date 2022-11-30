class AnimalMedicalInfo {
  AnimalId: String;
  Chipped: Boolean | null;
  Sterilized: Boolean | null;
  Skeletal: String;
  Muscular: String;
  Nervous: String;
  Endocrine: String;
  Cardiovascular: String;
  Lymphatic: String;
  Respiratory: String;
  Digestive: String;
  Urinary: String;
  Reproductive: String;
  Optical: String;
  Dental: String;
  Dermalogical: String;
  Others: String;
  Weight:number|null;
  constructor(
    AnimalId: String,
    Chipped: Boolean | null,
    Sterilized: Boolean | null,
    Weight:number|null,
    Skeletal: String,
    Muscular: String,
    Nervous: String,
    Endocrine: String,
    Cardiovascular: String,
    Lymphatic: String,
    Respiratory: String,
    Digestive: String,
    Urinary: String,
    Reproductive: String,
    Optical: String,
    Dental: String,
    Dermalogical: String,
    Others: String
  ) {
    this.AnimalId = AnimalId;
    this.Chipped = Chipped;
    this.Sterilized = Sterilized;
    this.Skeletal = Skeletal;
    this.Muscular = Muscular;
    this.Nervous = Nervous;
    this.Endocrine = Endocrine;
    this.Cardiovascular = Cardiovascular;
    this.Lymphatic = Lymphatic;
    this.Reproductive = Reproductive;
    this.Respiratory = Respiratory;
    this.Dental = Dental;
    this.Digestive = Digestive;
    this.Urinary = Urinary;
    this.Optical = Optical;
    this.Others = Others;
    this.Dermalogical = Dermalogical;
    this.Weight=Weight
  }
}

export default AnimalMedicalInfo;
