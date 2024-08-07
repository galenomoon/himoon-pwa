import api_client from "@/config/api_client";
import { IProduct } from 'admoon';

export const getFavorites = async (): Promise<IProduct[] | undefined> => {
  try {
    const { data } = await api_client.get("/favorites/me/");
    return data as unknown as IProduct[];
  } catch (error) {
    console.error(error);
  }
};
