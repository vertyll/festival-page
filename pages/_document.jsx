import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Tworzenie nowego arkusza stylów
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      // Zastąpienie renderowania strony, aby dołączyć style
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      // Pobranie początkowych właściwości dokumentu
      const initialProps = await Document.getInitialProps(ctx);

      // Zwrócenie właściwości wraz ze stylem strony
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      // Upewnienie się, że arkusz stylów jest uszczelniony
      sheet.seal();
    }
  }

  // Renderowanie struktury dokumentu HTML
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
