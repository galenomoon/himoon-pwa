import api_client from "@/config/api_client";
import { IAddress } from "@/interfaces/address";

export const createAddress = async (address: IAddress): Promise<IAddress | undefined> => {
  try {
    const { data } = await api_client.post("/addresses", address);

    return data as unknown as IAddress;
  } catch (error) {
    console.error(error);
  }
};
