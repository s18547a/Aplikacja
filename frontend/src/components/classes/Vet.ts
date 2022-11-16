class Vet {
  VetId: string | undefined;
  Name: string | undefined;
  LastName: String | undefined;
  Contact: string | undefined;

  HireDate: string | undefined;
  ProfileImage: string | null | undefined;
  Types: { VetType: string; Salary: number }[];
  constructor(
    VetId: string | undefined,
    Name: string | undefined,
    LastName: String | undefined,
    Contact: string | undefined,

    HireDate: string | undefined,
    ProfileImage: string | null | undefined,
    Types: { VetType: string; Salary: number }[]
  ) {
    this.VetId = VetId;
    this.Name = Name;
    this.LastName = LastName;
    this.Contact = Contact;
    this.Types = Types;
    this.HireDate = HireDate;
    this.ProfileImage = ProfileImage;
  }
}

export default Vet;
