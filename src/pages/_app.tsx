import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import NextHeader from "@/components/NextHeader";
import CartContextProvider from "@/contexts/cartContext";
import AuthContextProvider from "@/contexts/authContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <CartContextProvider>
        <NextHeader />
        <Component {...pageProps} />
        <Toaster />
      </CartContextProvider>
    </AuthContextProvider>
  );
}
