class Illness {
  AnimalId: String;
  VisitId: String;
  Description: String;
  DiagnosisDate: String;
  RecoveryDate: String | null;

  constructor(
    AnimalId: String,
    VisitId: String,
    Description: String,
    DiagnosisDate: String,
    RecoveryDate: String | null
  ) {
    this.AnimalId = AnimalId;
    this.VisitId = VisitId;
    this.Description = Description;
    this.DiagnosisDate = DiagnosisDate;
    this.RecoveryDate = RecoveryDate;
  }
}

export default Illness;
