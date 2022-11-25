class VaccineType {
  VaccineType: String;
  Species: String | null;
  Core: boolean;
  constructor(VaccineType: String, Species: String | null, Core: boolean) {
    this.VaccineType = VaccineType;
    this.Species = Species;
    this.Core = Core;
  }
}

export default VaccineType;
