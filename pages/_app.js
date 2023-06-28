import { ModalContextProvider } from "../contexts/ModalContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ModalContextProvider>
      <Component {...pageProps} />
    </ModalContextProvider>
  );
}

export default MyApp;
