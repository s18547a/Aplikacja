class Vet {
    VetId: string;
    Name: string;
    LastName: string;
    Contact: string;
    Email: string;
    HireDate: string;
    ProfileImage: string | null;
    Types: { VetType: string; Salary: number }[];
    constructor(
        VetId: string,
        Name: string,
        LastName: string,
        Contact: string,
        Email: string,
        HireDate: string,
        ProfileImage: string | null,
        Types: { VetType: string; Salary: number }[]
    ) {
        this.VetId = VetId;
        this.Name = Name;
        this.LastName = LastName;
        this.Contact = Contact;
        this.Types = Types;
        this.HireDate = HireDate;
        this.Email = Email;
        this.ProfileImage = ProfileImage;
    }
}

export default Vet;
