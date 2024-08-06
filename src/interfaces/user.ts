import { IAddress } from "./address";

export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  phone: string;
  email: string;
  addresses?: IAddress[];
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}
