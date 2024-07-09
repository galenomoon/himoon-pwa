import React, { useContext } from "react";

//next
import Link from "next/link";

//components
import Cart from "../Cart";
import Logo from "../Logo";

//icons
import { GoArrowLeft } from "react-icons/go";
import { FaBasketShopping } from "react-icons/fa6";

//contexts
import { CartContext } from "@/contexts/cartContext";

export default function Header({ backTo = "/" }) {
  const { openCart = () => {}, totalCartQuantity } = useContext(CartContext);

  return (
    <header className="flex w-full justify-between items-center top-0 bg-white pt-6 pb- z-20 rounded-t-[36px]">
      <Link
        href={backTo || "/"}
        className="flex justify-center itemx-center w-fit"
      >
        {backTo !== "/" ? <GoArrowLeft size={44} /> : <Logo size={74} />}
      </Link>
      <button onClick={openCart} className="relative flex items-center justify-center">
        <div className="bg-typography-yellow w-[20px] h-[16px] z-10 bottom-1 absolute" />
        <FaBasketShopping size={40} className="z-20" />
        <data className="absolute z-30 -top-1 -right-1 bg-background-black text-typography-yellow border border-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {totalCartQuantity}
        </data>
      </button>
      <Cart />
    </header>
  );
}
