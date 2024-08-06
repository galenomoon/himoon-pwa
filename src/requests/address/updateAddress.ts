import api_client from "@/config/api_client";
import { IAddress } from "@/interfaces/address";

export const updateAddress = async (address: IAddress): Promise<IAddress | undefined> => {
  try {
    if (!address.id) return;
    const { data } = await api_client.put(`/addresses/${address.id}`, address);

    return data as unknown as IAddress;
  } catch (error) {
    console.error(error);
  }
};
