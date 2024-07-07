import NextHeader from "@/components/Global/NextHeader";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextHeader />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
