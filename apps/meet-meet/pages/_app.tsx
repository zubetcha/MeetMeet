import { useCallback, useEffect, useMemo, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { debounce } from "lodash";

import { ApolloProvider } from "@apollo/client";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import client from "../apollo-client";
import { RecoilRoot } from "recoil";
import { PushNotificationLayout } from "@components/commons/Layout/PushNotificationLayout";
import { initFirebaseApp } from "@utils/firebase";
import { THEME_COLOR } from "constants/theme";

import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "@components/commons/Layout/Layout";
import { RouterGuard } from "@components/commons/RouterGuard/RouterGuard";
import { SuccessModal } from "@components/commons/Modal/SuccessModal";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const exceptionList = ["/login", "/join", "/join/onboarding"];
  const queryClient = new QueryClient();
  queryClient.setDefaultOptions({
    queries: {
      retry: false,
    },
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  useEffect(() => {
    initFirebaseApp();
  }, [])

  useEffect(() => {
    window.scrollTo(0, 1);
    debounceInnerHeight();
    window.addEventListener('resize', debounceInnerHeight);

    return () => {
      window.removeEventListener('resize', debounceInnerHeight);
    }
  }, [])

  const setVhProperty = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  const debounceInnerHeight = useMemo(
    () => debounce(setVhProperty, 300)
  , []);

  return (
    <>
      <Head>
        <title>MeetMeet</title>
        <meta name="theme-color" content={THEME_COLOR.light}></meta>
      </Head>
      
        <QueryClientProvider client={queryClient}>
          <ApolloProvider client={client}>
            <RecoilRoot>
              <RouterGuard>
              {exceptionList.includes(router.pathname) ? (
                <Component {...pageProps} />
              ) : (
                <PushNotificationLayout>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </PushNotificationLayout>
              )}
              <SuccessModal />
              </RouterGuard>
            </RecoilRoot>
          </ApolloProvider>
        </QueryClientProvider>
    </>
  );
}

export default MyApp;
