import React, { useContext } from "react";
import TabNavigator from "@/components/TabNavigation";
import {
  PiCreditCard,
  PiEnvelope,
  PiMapPin,
  PiPhone,
  PiSealCheckFill,
  PiUserList,
  PiUserSwitch,
} from "react-icons/pi";
import Link from "next/link";
import { RxCaretRight } from "react-icons/rx";
import { AuthContext } from "@/contexts/authContext";

export default function Profile() {
  const { currentUser, logout } = useContext(AuthContext);
  const isAdmin = currentUser?.isAdmin;

  const options = [
    {
      title: "Dados Pessoais",
      Icon: PiUserList,
      href: "/perfil/dados-pessoais",
      description: "Ajuste informações suas informações pessoais, como nome e telefone",
    },
    // {
    //   title: "Endereços",
    //   Icon: PiMapPin,
    //   href: "/perfil/enderecos",
    //   description: "Gerencie seus endereços de entrega",
    // },
    // {
    //   title: "Cartões",
    //   Icon: PiCreditCard,
    //   href: "/perfil/cartoes",
    //   description: "Gerencie os cartões cadastrados na sua conta",
    // },
    ...(isAdmin
      ? [
          {
            title: "Acessar Modo Administrador",
            isRestricted: true,
            Icon: PiUserSwitch,
            href: "/perfil/administrador",
            description: "Acesse o painel de controle da sua loja virtual",
          },
        ]
      : []),
  ];

  return (
    <main className="flex flex-col items-center">
      <section className="max-w-screen-desktop w-full flex flex-col items-center">
        <section className="flex flex-col gap-2 items-center justify-center py-8">
          <figure className="w-[110px] h-[110px] rounded-full overflow-hidden bg-gradient-to-tr from-background-purple to-typography-purpleDark flex items-center justify-center">
            <p className="text-5xl font-thin text-center text-white">
              {currentUser?.firstName.charAt(0)}
              {currentUser?.lastName.charAt(0)}
            </p>
          </figure>
          <article className="flex flex-col text-center items-center justify-center">
            <h1 className="font-semibold text-2xl relative">
              {currentUser?.firstName} {currentUser?.lastName}
              {!isAdmin ? (
                <></>
              ) : (
                <PiSealCheckFill
                  size={18}
                  className="absolute -top-0 -right-[21px] text-typography-purpleDark"
                />
              )}
            </h1>
            <div className="text-typography-primary/60 flex gap-1 items-center justify-center">
              <PiEnvelope size={18} />
              <p>{currentUser?.email}</p>
            </div>
            <div className="text-typography-primary/60 flex gap-1 items-center justify-center">
              <PiPhone size={18} />
              <p>{currentUser?.phone}</p>
            </div>
            {/* <div className="text-typography-primary/60 flex gap-1 items-center justify-center">
            <PiMapPin size={18} />
            <p className="underline">
              Alterar endereço
            </p>
          </div> */}
          </article>
        </section>
        <section className="flex flex-col items-center w-full px-4 gap-4 justify-center">
          {options.map((option) => {
            const { Icon, title, href, description, isRestricted } = option;
            return (
              <Link
                key={title}
                href={href}
                className="flex w-full items-center h-fit gap-3"
              >
                <section className="flex w-full gap-3">
                  <div className="w-10 h-10 rounded-full flex-shrink-0 bg-background-purple border-[1.2px] border-typography-primary/10 flex items-center justify-center">
                    <Icon size={24} color="#493B83" />
                  </div>
                  <article className="flex w-full flex-col text-base">
                    <h2 className=" w-fit flex relative gap-1 items-center">
                      {title}
                      {isRestricted && (
                        <PiSealCheckFill
                          size={18}
                          className="absolute -top-0 -right-[21px] text-typography-purpleDark"
                        />
                      )}
                    </h2>
                    <p className="text-typography-primary/40 text-sm leading-[16px]">
                      {description}
                    </p>
                  </article>
                </section>
                <RxCaretRight
                  size={28}
                  color="#493B83"
                  className="flex-shrink-0"
                />
              </Link>
            );
          })}
          <button
            onClick={logout}
            className="flex w-full justify-center items-center py-4 h-fit gap-3"
          >
            <h2 className=" w-fit flex relative gap-1 items-center text-red-500">
              Sair
            </h2>
          </button>
        </section>
        <TabNavigator />
      </section>
    </main>
  );
}
