class Owner {
  OwnerId: string | null | undefined;
  Name: string | undefined;
  LastName: string | undefined;
  Contact: string | undefined;
  Email: string | undefined;
  Password: string | null | undefined;
  constructor(
    OwnerId: string | null | undefined,
    Name: string | undefined,
    LastName: string | undefined,
    Contact: string | undefined,
    Email: string | undefined,
    Password: string | null | undefined
  ) {
    this.OwnerId = OwnerId;
    this.Name = Name;
    this.LastName = LastName;
    this.Contact = Contact;
    this.Email = Email;
    this.Password = Password;
  }
}
export default Owner;
