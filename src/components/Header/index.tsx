import React, { useContext } from "react";

//components
import Cart from "../Cart";

//icons
import { PiMapPin } from "react-icons/pi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

//contexts
import { AuthContext } from "@/contexts/authContext";
import { CartContext } from "@/contexts/cartContext";

//components
import { SearchBar } from "@/components/SearchBar";
import CategoriesList from "@/components/CategoriesList";

//next
import Link from "next/link";
import { useRouter } from "next/router";

//hooks
import { useScrollHeader } from "@/hooks/useScrollHeader";

export default function Header({
  backTo = "",
  showAddress = true,
  showCategories = false,
  isCategoryListOpen = false,
  onFocus = (value: boolean) => {},
  onChange = (value: string) => {},
  searchTerm = "",
  onSelectCategory = (value?: string) => {},
}) {
  const router = useRouter();
  const showHeader = useScrollHeader();
  const { defaultAddress, openModal, currentUser } = useContext(AuthContext);
  const copleteAddress = [
    defaultAddress?.name,
    defaultAddress?.street,
    defaultAddress?.number,
  ];
  const addressLabel = copleteAddress.includes("")
    ? "Adicione um endereço"
    : copleteAddress.join(", ") || "Selecione um endereço";

  const { openCart = () => {}, totalCartQuantity } = useContext(CartContext);

  function onSearch() {
    return router.push({
      pathname: "/buscar",
      query: { search: searchTerm },
    });
  }

  return (
    <div
      className={`transition-transform sticky w-full flex flex-col bg-background-purple top-0 z-40 duration-500 ${
        showHeader
          ? "transform translate-y-0"
          : "transform -translate-y-[100dvh]"
      } ${
        isCategoryListOpen
          ? " border-b-[1.3px] border-background-black/40 "
          : ""
      } `}
    >
      <section className="max-w-screen-desktop self-center w-full">
        <div className="flex gap-2 px-3 pt-3 pb-1 ">
          {backTo && (
            <Link
              href={backTo}
              className="flex items-center w-[22px] justify-center flex-shrink-0"
            >
              <RxCaretLeft size={45} className="flex-shrink-0" />
            </Link>
          )}
          <SearchBar
            onSubmit={() => {
              onSearch();
              onFocus(false);
            }}
            searchTerm={searchTerm}
            onFocus={() => onFocus(true)}
            onChange={(e) => onChange(e.target.value)}
          />
          <button
            onClick={openCart}
            className="relative flex items-center justify-center flex-shrink-0"
          >
            <svg className="w-12 h-12" viewBox="0 0 25 25">
              <path
                fill="#000000"
                d="M10 2a1.75 1.75 0 1 0 0 3.5h4A1.75 1.75 0 1 0 14 2zM3.863 16.205c-.858-3.432-1.287-5.147-.386-6.301c.901-1.154 2.67-1.154 6.207-1.154h4.63c3.538 0 5.307 0 6.208 1.154c.9 1.153.472 2.87-.386 6.301c-.546 2.183-.819 3.274-1.633 3.91c-.813.635-1.938.635-4.188.635h-4.63c-2.25 0-3.376 0-4.19-.635c-.813-.636-1.086-1.727-1.632-3.91"
              />
              <path
                fill="#F9F1B2"
                d="M15.58 4.502a1.743 1.743 0 0 0 .002-1.501c.683.005 1.216.036 1.692.222a3.25 3.25 0 0 1 1.426 1.09c.367.494.54 1.127.776 1.998l.047.17l.512 2.964c-.408-.282-.935-.45-1.617-.55l-.361-2.087c-.284-1.04-.387-1.367-.561-1.601a1.75 1.75 0 0 0-.768-.587c-.22-.086-.486-.111-1.148-.118M8.418 3a1.743 1.743 0 0 0 .002 1.502c-.662.007-.928.032-1.148.118a1.75 1.75 0 0 0-.768.587c-.174.234-.277.561-.56 1.6l-.362 2.089c-.681.1-1.208.267-1.617.548l.512-2.962l.047-.17c.237-.872.41-1.506.776-2a3.25 3.25 0 0 1 1.426-1.089c.476-.186 1.008-.217 1.692-.222m.332 9.749a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0zM16 12a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4A.75.75 0 0 1 16 12m-3.25.75a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0z"
              />
            </svg>
            <data className="absolute z-30 -top-1 -right-1 bg-red-500 text-typography-yellow border border-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {totalCartQuantity}
            </data>
          </button>
        </div>
        {showAddress &&
          (!currentUser?.id ? (
            <button
              onClick={openModal}
              className="font-light pb-2 z-10 bg-background-purple w-full flex justify-center items-center px-5 text-center"
            >
              <PiMapPin size={18} className="flex-shrink-0 mr-2" />
              <p className="line-clamp-1">{addressLabel}</p>
              <RxCaretRight size={28} className="flex-shrink-0" />
            </button>
          ) : (
            <Link
              href={addressLabel === "Adicione um endereço" ? "/perfil/enderecos/criar" : "/perfil/enderecos"}
              className="font-light pb-2 z-10 bg-background-purple w-full flex justify-center items-center px-5 text-center"
            >
              <PiMapPin size={18} className="flex-shrink-0 mr-2" />
              <p className="line-clamp-1">{addressLabel}</p>
              <RxCaretRight size={28} className="flex-shrink-0" />
            </Link>
          ))}
        {showCategories && (
          <CategoriesList
            selectUnique
            isRow={!isCategoryListOpen}
            onSelectCategory={onSelectCategory}
          />
        )}
      </section>

      <Cart />
    </div>
  );
}
