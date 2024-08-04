"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";

//next
import { useRouter } from "next/router";

//interfaces
import { IUser } from "@/interfaces/user";

//requests
import { login } from "@/requests/login";
import { createUser } from "@/requests/createUser";
import destroySession from "@/utils/destroySession";
import { getCurrentUser } from "@/requests/getCurrentUser";

//utils
import { parseCookies } from "nookies";
import toast from "react-hot-toast";

interface AuthContextInterface {
  isOpened?: boolean;
  openModal?: () => void;
  closeModal?: () => void;
  currentUser?: IUser | null;
  submit?: (authMode: "login" | "create", user: IUser) => void;
  logout?: () => void;
}

export const AuthContext = createContext<AuthContextInterface>({
  isOpened: false,
  openModal: () => {},
  closeModal: () => {},
  currentUser: null,
  submit: async () => {},
  logout: async () => {},
});

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { push } = useRouter();
  const [isOpened, setIsOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  useEffect(() => {
    updateCurrentUser();
  }, [currentUser]);

  async function updateCurrentUser() {
    if (currentUser) return;
    try {
      const { token } = parseCookies();
      const data = await getCurrentUser(token);
      setCurrentUser(data as IUser);
    } catch (error) {
      await logout();
      console.error(error);
    }
  }

  const submit = async (authMode: "login" | "create", user: IUser) => {
    const auth = (authMode === "create" ? createUser : login) as (
      user: IUser
    ) => Promise<IUser | undefined>;

    try {
      const response = await auth(user);

      if (!response?.id) {
        toast("Ocorreu um erro ao entrar na sua conta", {
          icon: "❌",
        });
        return;
      }

      setCurrentUser(response as IUser);
      setIsOpened(false);
      push("/perfil");
      setIsOpened(false);
      toast("Você entrou na sua conta", {
        icon: "🎉",
      });
    } catch (error) {
      console.error(error);
      toast("Ocorreu um erro ao entrar na sua conta", {
        icon: "❌",
      });
    }
  };

  const logout = async () => {
    setCurrentUser(null as unknown as IUser);
    destroySession();
    push("/");
    toast("Você saiu da sua conta", {
      icon: "👋",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        submit,
        logout,
        isOpened,
        currentUser,
        openModal: () => setIsOpened(true),
        closeModal: () => setIsOpened(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
