import React from "react";

//next
import Image from "next/image";

//components
import Logo from "../Logo";
import Link from "next/link";

//assets
import developerLogo from "@/assets/developer_logo.png";

//styles
import { BsInstagram, BsTiktok, BsWhatsapp } from "react-icons/bs";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col w-full h-fit border-t-2 bg-white/80 border-background-purple/20 pb-28">
      <div className="max-w-screen-desktop w-full flex flex-col self-center">
        <section className="flex desktop:flex-row flex-col w-full justify-between p-8">
          <figure className="w-full flex saturate-0 desktop:justify-start desktop:items-start mobile:justify-center mobile:items-center opacity-60 ">
            <Logo size={90} />
          </figure>
          <aside className="mobile:w-full text-xs desktop:w-[300px] desktop:items-end mobile:items-center desktop:mt-0 mobile:mt-8 flex flex-col gap-2">
            <h2 className="uppercase font-semibold  tracking-[3px] opacity-80">
              Encontre
            </h2>
            <Link href="/" className="opacity-60 underline">
              Início
            </Link>
            <Link href="/favoritos" className="opacity-60 underline">
              Favoritos
            </Link>
            <Link href="/notificacoes" className="opacity-60 underline">
              Notificações
            </Link>
            <Link href="/pedidos" className="opacity-60 underline">
              Pedidos
            </Link>
          </aside>
        </section>
        <section className="flex desktop:flex-row mobile:flex-col w-full justify-between px-8 opacity-60 text-center text-sm">
          <p>
            © {currentYear} - <span>Todos os direitos reservados</span>
          </p>
          {/* <p>
            <span className="underline">Política de Privacidade</span>
          </p>
          <p>
            <span className="underline">Termos de Utilização</span>
          </p> */}
          <div className="flex gap-6 items-center justify-center mobile:mt-3 desktop:mt-0">
            <a
              href={`https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
            >
              <BsWhatsapp
                size={20}
                className="text-typography-primary hover:opacity-100 duration-300 opacity-80"
              />
            </a>
            <a
              href={"https://www.instagram.com/himoonstore/"}
              target="_blank"
              rel="noreferrer"
            >
              <BsInstagram
                size={20}
                className="text-typography-primary hover:opacity-100 duration-300 opacity-80"
              />
            </a>
            <a
              href={"https://www.tiktok.com/@eu.lua.santiago"}
              target="_blank"
              rel="noreferrer"
            >
              <BsTiktok
                size={20}
                className="text-typography-primary hover:opacity-100 duration-300 opacity-80"
              />
            </a>
          </div>
        </section>
        <section className="flex flex-col w-full justify-center p-8 gap-2 items-center border-t-2 border-white/10">
          <p className="opacity-60 font-light text-xs">Desenvolvido por:</p>
          <a href="https://galenomoon.com" target="_blank" rel="noreferrer">
            <Image
              src={developerLogo}
              width={100}
              height={100}
              alt="Developer Logo"
              className="opacity-40 invert"
            />
          </a>
        </section>
      </div>
    </footer>
  );
}
