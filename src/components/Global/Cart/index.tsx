import React, { Fragment, useContext } from "react";

import Button from "../Button";
import { motion } from "framer-motion";
import { fade } from "@/animations/fade";
import { slide } from "@/animations/slide";
import { IoMdClose } from "react-icons/io";
import { ProductCard } from "../ProductCard";
import { CartContext } from "@/contexts/cartContext";

export default function Cart() {
  const { cartItems, isCartOpened, closeCart, totalCartQuantity, totalPrice } =
    useContext(CartContext);

  function sendCartToWhatsApp() {
    let total = 0;

    const message = cartItems.map((cartItem) => {
      const price = cartItem.product.price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });

      total += Number(cartItem.product.price) * cartItem.quantity;

      return `
      *${cartItem.product.name}*
      Qtd: ${cartItem.quantity}
      Preço: ${price}
      ____________________
      `;
    });

    const total_price = totalPrice.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const formattedMessage = `
      *🛒💗 Seu Carrinho 🛒💗:*
      
      ${message.join("")}
      *🎀 Total: R$ ${total_price} 🎀*
        `;

    const encodedMessage = encodeURIComponent(formattedMessage);
    const link = `https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}&text=${encodedMessage}`;

    window.open(link, "_blank");
  }

  return (
    <motion.div
      animate={fade(isCartOpened as boolean)}
      initial={{ display: "none" }}
      onClick={closeCart}
      className="max-w-screen fixed left-0 top-0 z-50 flex h-screen max-h-screen w-screen items-center justify-center overflow-hidden bg-black bg-opacity-20 backdrop-blur-md"
    >
      <motion.nav
        animate={slide(isCartOpened as boolean)}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col items-center z-50  overflow-y-auto bg-white py-6 px-3 shadow-lg transition-all duration-300 ease-out h-[100dvh] max-h-[100dvh] w-[100dvw] self-start rounded-none"
      >
        <header className="flex w-full items-center pb-3 justify-between">
          <h1 className="font-medium text-2xl">
            Carrinho ({totalCartQuantity})
          </h1>
          <button onClick={closeCart} className="rounded-lg bg-gray-200 p-0.5">
            <IoMdClose size={28} className="opacity-80" />
          </button>
        </header>
        {cartItems.length > 0 ? (
          <section className="flex h-full gap-2 w-full flex-col items-center overflow-auto">
            {cartItems.map((cartItem, index) => (
              <Fragment key={index}>
                <ProductCard product={cartItem.product} isCartItem cartItem={cartItem} />
              </Fragment>
            ))}
          </section>
        ) : (
          <section className="flex h-full flex-col items-center justify-center text-4xl">
            <h1>Seu carrinho está vazio</h1>
            <p className="font-regular text-xl text-typography-black/60">
              Adicione produtos para continuar
            </p>
            <Button
              href="/buscar"
              passHref
              onClick={closeCart}
              className="font-regular mt-6 flex w-[300px] flex-shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-typography-primary px-6 py-2 text-white duration-200 hover:bg-opacity-90 text-xl"
            >
              Ver produtos
            </Button>
          </section>
        )}
        <footer className=" bottom-0 bg-white left-0 w-full flex flex-col border-t-2 border-background-gray p-3 gap-2">
          <div className="flex justify-between">
            <p className="text-2xl font-light">Total</p>
            <p className="text-2xl font-bold">
              {totalPrice.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
          <Button
            onClick={sendCartToWhatsApp}
            disabled={cartItems.length === 0}
            className="w-full p-4 bg-primary uppercase font-semibold"
          >
            Finalizar compra
          </Button>
        </footer>
      </motion.nav>
    </motion.div>
  );
}
