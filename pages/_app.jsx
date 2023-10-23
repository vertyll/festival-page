import "@/styles/globals.css";
import { CartContextProvider } from "@/componenets/organism/CartContext";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body{
    font-family: 'Roboto', sans-serif;
    padding: 0;
    margin: 0;
    background-color: var(--main-white-smoke-color);
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
