import "@/styles/globals.css";
import { CartContextProvider } from "@/components/organism/CartContext";
import { createGlobalStyle } from "styled-components";
import { SessionProvider } from "next-auth/react";
import ScrollToTop from "@/components/atoms/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";

const GlobalStyles = createGlobalStyle`
  body{
    font-family: 'Roboto', sans-serif;
    padding: 0;
    margin: 0;
    background-color: var(--main-background-color);
  }
`;

export default function App({ Component, pageProps: { session, ...pageProps }, router }) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <Head>
          <meta name="author" content="Mikołaj Gawron" />
          <meta name="description" content="Praca inżynierska - strona festiwalu muzycznego z sklepem internetowym" />
        </Head>
        <CartContextProvider>
          <AnimatePresence mode="wait">
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
          <ScrollToTop />
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
