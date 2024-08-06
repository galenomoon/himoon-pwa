import { IUser } from "@/interfaces/user";
import api_client from "@/config/api_client";

export const getCurrentUser = async (
  token: string
): Promise<IUser | undefined> => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const { data } = await api_client.get("/users/me/info", { headers });

    return data as unknown as IUser;
  } catch (error) {
    console.error(error);
  }
};
