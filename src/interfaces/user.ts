export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  phone: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
