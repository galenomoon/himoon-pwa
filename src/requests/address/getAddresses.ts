import { IAddress } from '@/interfaces/address';
import api_client from "@/config/api_client";

export const getAddresses = async (
  id: string
): Promise<IAddress[] | undefined> => {
  try {
    const { data } = await api_client.get("/addresses/me/");

    if (id) {
      return (data as unknown as IAddress[]).filter(
        (address) => address.id === id
      );
    }

    return data as unknown as IAddress[];
  } catch (error) {
    console.error(error);
  }
};
