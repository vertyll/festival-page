import "@/styles/globals.css";
import { CartContextProvider } from "@/componenets/organism/CartContext";
import { createGlobalStyle } from "styled-components";
import { SessionProvider } from "next-auth/react";
import ScrollToTop from "@/componenets/atoms/ScrollToTop";

const GlobalStyles = createGlobalStyle`
  body{
    font-family: 'Roboto', sans-serif;
    padding: 0;
    margin: 0;
    background-color: var(--main-white-smoke-color);
  }
`;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <Component {...pageProps} />
          <ScrollToTop />
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
