import React, { useContext, useState } from "react";
import Link from "next/link";

//styles
import {
  PiBagSimple,
  PiPencilSimple,
  PiPushPin,
  PiPushPinSlash,
  PiTrash,
} from "react-icons/pi";
import toast from "react-hot-toast";
import { RxCaretLeft } from "react-icons/rx";
import { AiOutlineHome } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

//components
import Button from "@/components/Button";

//contexts
import { AuthContext } from "@/contexts/authContext";

//requests
import { deleteAddress } from "@/requests/address/deleteAddress";

//interfaces
import { IAddress } from "@/interfaces/address";
import { updateAddress } from "@/requests/address/updateAddress";

export default function AddressesPage() {
  const { currentUser, updateCurrentUser = () => {} } = useContext(AuthContext);
  const [popoverOpened, setPopoverOpened] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  const handleDelete = async (id: string) => {
    setIsLoaded(false);
    try {
      await deleteAddress(id);
      await updateCurrentUser();
      toast.success("Endereço deletado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao deletar endereço");
    } finally {
      setIsLoaded(true);
      setPopoverOpened("");
    }
  }

  const handleDefault = async (address: IAddress) => {
    try {
      const isDefault = address.default;
      await updateAddress({ ...address, default: !isDefault });
      await updateCurrentUser();
      toast.success(`Endereço ${isDefault ? "desmarcado" : "marcado"} como padrão`);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao definir endereço padrão");
    } finally {
      setPopoverOpened("");
    }
  }

  return (
    <main className="flex flex-col items-center">
      <section className="max-w-screen-desktop w-full flex gap-6 flex-col items-center p-3">
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
            <p>Endereços</p>
          </div>
          <div className="w-full flex items-center justify-end"></div>
          <div />
        </header>
        <article className="flex flex-col gap-3 w-full">
          {currentUser?.addresses?.map((address, index) => {
            const isDefault = address.default;
            const NameIcon =
              address.name === "Trabalho" ? PiBagSimple : AiOutlineHome;

            const PinIcon = isDefault ? PiPushPinSlash : PiPushPin;

            return (
              <section
                key={address.id}
                className={`flex gap-2 w-full h-fit p-3 border-2 border-typography-primary/10 rounded-2xl ${
                  isDefault
                    ? "border-typography-purpleDark/60 bg-background-purple/40 text-typography-purpleDark"
                    : ""
                }`}
              >
                <figure className="h-full items-center flex-shrink-0">
                  <NameIcon size={24} />
                </figure>
                <article className="flex flex-col gap-1 w-full">
                  <p>
                    {address.street} {address.number} - {address.name}
                  </p>
                  <p
                    className={`${
                      isDefault ? "opacity-80" : "opacity-40"
                    } text-sm font-light`}
                  >
                    CEP {address.zip} - {address.state} - {address.city}
                  </p>
                  <div
                    className={`${
                      isDefault ? "opacity-80" : "opacity-40"
                    } flex flex-col text-sm font-light`}
                  >
                    <p> {address.recipientName}</p>
                    <p> {address.contact}</p>
                  </div>
                </article>
                <div className="relative self-start">
                  <button
                    onClick={() => setPopoverOpened(address?.id as string)}
                    className={isDefault ? "opacity-80" : "opacity-40"}
                  >
                    <BsThreeDotsVertical size={20} />
                  </button>
                  {popoverOpened === address.id && (
                    <nav className="shadow-lg text-start rounded-2xl border text-typography-primary py-2 border-typography-primary/20 right-0 w-fit h-hit absolute bg-white z-20">
                      <button
                        onClick={() => {
                          handleDefault(address);
                        }}
                        className="gap-2 w-full px-4 py-1 flex items-center"
                      >
                        <PinIcon size={20} className="flex-shrink-0" />
                        <p className="whitespace-nowrap">
                          {isDefault ? "Desmarcar" : "Marcar"} como padrão
                        </p>
                      </button>
                      <Link
                        href={`/perfil/enderecos/editar/${address.id}`}
                        className="gap-2 w-full px-4 py-1 flex items-center"
                      >
                        <PiPencilSimple size={20} className="flex-shrink-0" />
                        <p>Editar</p>
                      </Link>
                      <button
                        onClick={() => {
                          handleDelete(address.id as string);
                        }}
                        className="gap-2 w-full text-red-500 px-4 py-1 flex items-center"
                      >
                        <PiTrash size={20} className="flex-shrink-0" />
                        <p>Deletar</p>
                      </button>
                    </nav>
                  )}
                </div>
              </section>
            );
          })}
        </article>
        <div className="flex flex-col gap-3 w-full">
          <Button
            href="/perfil/enderecos/criar"
            className="w-full"
          >
            Adicionar Endereço
          </Button>
        </div>
      </section>
    </main>
  );
}
