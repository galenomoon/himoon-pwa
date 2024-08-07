import { IUser } from "@/interfaces/user";
import api_client from "@/config/api_client";
import { login } from "./login";

export const createUser = async (user: IUser): Promise<IUser | undefined> => {
  try {
    await api_client.post("/users", user);
    const loggedNewUser = await login(user);

    return loggedNewUser as unknown as IUser;
  } catch (error) {
    console.error(error);
  }
};
