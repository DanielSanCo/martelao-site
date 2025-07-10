import NavBar from "@/components/navBar";
import NavBarFooter from "@/components/navBarFooter";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <NavBar />
    <NavBarFooter />
    <Component {...pageProps} />
  </>
    ;
}
