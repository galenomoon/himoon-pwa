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
import { RxCaretLeft } from "react-icons/rx";
import { AiOutlineHome } from "react-icons/ai";

//components
import Button from "@/components/Button";

//contexts
import { AuthContext } from "@/contexts/authContext";

//requests
import { updateUser } from "@/requests/user/updateUser";

//interfaces
import { IUser } from "@/interfaces/user";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function AddressesPage() {
  // const { currentUser, updateCurrentUser } = useContext(AuthContext);
  const [popoverOpened, setPopoverOpened] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);

  const currentUser = {
    addresses: [
      {
        id: "1",
        name: "Casa",
        recipientName: "Luana Claricy Santiago Ferreira",
        street: "Rua Comendador",
        neighborhood: "Bairro 1",
        city: "Francisco Beltrão",
        state: "São Paulo",
        zip: "12345-678",
        number: "123",
        contact: "(13) 12345-6789",
        default: true,
        userId: "1",
      },
      {
        id: "2",
        name: "Trabalho",
        recipientName: "João",
        street: "Rua Colombia",
        neighborhood: "Bairro 2",
        city: "Cidade 2",
        state: "Estado 2",
        zip: "12345-678",
        number: "123",
        contact: "123456789",
        default: false,
        userId: "1",
      },
    ],
  } as IUser;

  return (
    <main className="flex flex-col items-center">
      <section className="max-w-screen-desktop w-full flex gap-6 flex-col items-center p-3">
        <header className="w-full flex justify-between items-center">
          <div className="w-full flex items-center justify-start">
            <Link
              href={"/enderecos"}
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
                    onClick={() => setPopoverOpened(address.id)}
                    className={isDefault ? "opacity-80" : "opacity-40"}
                  >
                    <BsThreeDotsVertical size={20} />
                  </button>
                  {popoverOpened === address.id && (
                    <nav className="shadow-lg text-start rounded-2xl border text-typography-primary py-2 border-typography-primary/20 right-0 w-fit h-hit absolute bg-white z-20">
                      <button
                        onClick={() => {
                          setPopoverOpened("");
                        }}
                        className="gap-2 w-fit px-4 py-1 flex items-center"
                      >
                        <PinIcon size={20} className="flex-shrink-0" />
                        <p className="whitespace-nowrap">
                          {isDefault ? "Desmarcar" : "Marcar"} como padrão
                        </p>
                      </button>
                      <button
                        onClick={() => {
                          setPopoverOpened("");
                        }}
                        className="gap-2 w-fit px-4 py-1 flex items-center"
                      >
                        <PiPencilSimple size={20} className="flex-shrink-0" />
                        <p>Editar</p>
                      </button>
                      <button
                        onClick={() => {
                          setPopoverOpened("");
                        }}
                        className="gap-2 w-fit text-red-500 px-4 py-1 flex items-center"
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
          <Button isLoading={!isLoaded} type="submit" className="w-full">
            Adicionar Endereço
          </Button>
        </div>
      </section>
    </main>
  );
}
