export enum UserType {
  Owner,
  Vet,
  None,
}

export interface UserI {
  userId: string;
  userType: UserType;
  userTypeId: string;
  isManager: boolean | null;
  Email: string;
  token: string;
}
