import { IUser } from "@/interfaces/user";
import api_client from "@/config/api_client";
import toast from "react-hot-toast";

export const updateUser = async (user: IUser) => {
  try {
    const { data } = await api_client.put(`/users/${user?.id}`, user);
    return data;
  } catch (error) {
    console.error(error);
    toast.error("Erro ao atualizar perfil");
  }
};
