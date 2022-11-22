import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Modal from "react-modal";

Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
