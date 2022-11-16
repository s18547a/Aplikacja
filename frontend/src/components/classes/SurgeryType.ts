class SurgeryType {
  SurgeryType: string;
  Price: number;
  VetType: string;

  constructor(SurgeryTpe: string, Price: number, VetType: string) {
    this.SurgeryType = SurgeryTpe;
    this.Price = Price;
    this.VetType = VetType;
  }
}

export default SurgeryType;
