import { useEffect } from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { Layout } from "@components/commons/Layout/Layout";

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  return (
    <>
      <Head>
        <title>MeetMeet</title>
        <meta charSet="utf-8"></meta>
      </Head>
      <ApolloProvider client={client}>
        {
          router.pathname === "/" 
          ? <Component {...pageProps} />
          : <Layout>
              <Component {...pageProps} />
            </Layout>
        }
      </ApolloProvider>
    </>
  );
}

export default MyApp;
