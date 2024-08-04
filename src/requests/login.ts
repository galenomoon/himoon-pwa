import { setCookie } from "nookies";
import { IUser } from "@/interfaces/user";
import api_client from "@/config/api_client";

export const login = async (user: IUser): Promise<IUser | undefined> => {
  try {
    const { data } = await api_client.post("/users/login", {
      email: user.email,
      password: user.password,
    });

    const token = data.token
    setCookie(undefined, "token", token);

    return data as unknown as IUser;
  } catch (error) {
    console.error(error);
  }
};
