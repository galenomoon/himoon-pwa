import React, { useContext, useState } from "react";
import Link from "next/link";

//styles
import toast from "react-hot-toast";
import { PiUser } from "react-icons/pi";
import { RxCaretLeft } from "react-icons/rx";
import { MdOutlinePhoneAndroid } from "react-icons/md";

//components
import Button from "@/components/Button";
import { Input } from "@/components/Input";

//contexts
import { AuthContext } from "@/contexts/authContext";

//requests
import { updateUser } from "@/requests/user/updateUser";

//interfaces
import { IUser } from "@/interfaces/user";

export default function EditProfile() {
  const { currentUser, setCurrentUser = () => {} } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState({
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
    phone: currentUser?.phone,
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoaded(false);
    try {
      const data = await updateUser({ ...user, id: currentUser?.id } as IUser);
      setCurrentUser?.(data);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar perfil");
    } finally {
      setIsLoaded(true);
    }
  };

  return (
    <main className="flex flex-col items-center">
      <form
        onSubmit={submit}
        className="max-w-screen-desktop w-full flex gap-6 flex-col items-center p-3"
      >
        <header className="w-full flex justify-between items-center">
          <div className="w-full flex items-center justify-start">
            <Link
              href={"/perfil"}
              className="flex items-center w-[22px] justify-center flex-shrink-0"
            >
              <RxCaretLeft size={45} className="flex-shrink-0" />
            </Link>
          </div>
          <div className="w-full flex items-center justify-center font-medium text-xl">
            <p>Editar Perfil</p>
          </div>
          <div className="w-full flex items-center justify-end"></div>
          <div />
        </header>
        <figure className="w-[110px] h-[110px] rounded-full overflow-hidden bg-gradient-to-tr from-background-purple to-typography-purpleDark flex items-center justify-center">
          <p className="text-5xl font-thin text-center text-white">
            {user?.firstName?.toUpperCase()?.charAt(0)}
            {user?.lastName?.toUpperCase()?.charAt(0)}
          </p>
        </figure>
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full flex flex-col">
            <label className="text-typography-primary/80">Nome</label>
            <Input
              required
              Icon={PiUser}
              value={user.firstName}
              placeholder="Digite seu nome"
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="text-typography-primary/80">Sobrenome</label>
            <Input
              required
              Icon={PiUser}
              value={user.lastName}
              placeholder="Digite seu sobrenome"
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </div>
          <div className="w-full flex flex-col">
            <label className="text-typography-primary/80">
              Número de Celular
            </label>
            <Input
              required
              value={user.phone}
              Icon={MdOutlinePhoneAndroid}
              placeholder="(XX) XXXXX-XXXX"
              onChange={(e) => setUser({ ...user, phone: e.target.value })}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <Button isLoading={!isLoaded} type="submit" className="w-full">
            Salvar
          </Button>
          <Button
            href="/perfil"
            className="bg-white text-black border-black border-2 font-medium w-full"
          >
            Cancelar
          </Button>
        </div>
      </form>
    </main>
  );
}
