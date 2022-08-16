import { useEffect } from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return (
    <>
      <Head>
        <title>MeetMeet</title>
        <meta charSet="utf-8"></meta>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
