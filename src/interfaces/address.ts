export interface IAddress {
  id?: string;
  name: string;
  recipientName: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zip: string;
  number: string;
  contact: string;
  default: boolean;
  complement?: string;
  additionalInformation?: string;
  userId?: string;
}