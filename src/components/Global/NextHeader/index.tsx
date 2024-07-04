import Head from "next/head";
import React from "react";

export default function NextHeader({
  title = "Hi, Moon Store 🌙💖 - Sua papelaria criativa!",
  description = "A Moon Store é uma papelaria criativa que tem como objetivo trazer produtos de qualidade e com um preço acessível para você!",
  image = "/banner.png",
}) {
  return (
    <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="apple-touch-icon" href="/384x384.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/384x384.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/384x384.png" />
      <link rel="apple-touch-icon" sizes="167x167" href="/384x384.png" />
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
      <link rel="manifest" href="/manifest.json" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:url" content="https://www.himoonstore.com/" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:description" content={description} />
    </Head>
  );
}
