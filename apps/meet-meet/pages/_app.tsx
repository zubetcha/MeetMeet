import { useEffect } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import { ApolloProvider } from "@apollo/client";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import client from "../apollo-client";
import { RecoilRoot } from "recoil";
import { RecoilObserver } from "@components/commons/RecoilObserver/RecoilObserver";
import { PushNotificationLayout } from "@components/commons/Layout/PushNotificationLayout";
import { initFirebaseApp } from "@utils/firebase";

import "../styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "@components/commons/Layout/Layout";
import { RouterGuard } from "@components/commons/RouterGuard/RouterGuard";
import { SuccessModal } from "@components/commons/Modal/SuccessModal";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const exceptionList = ["/", "/login", "/join", "/join/onboarding"];
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

  return (
    <>
      <Head>
        <title>MeetMeet</title>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      
        <QueryClientProvider client={queryClient}>
          <ApolloProvider client={client}>
            <RecoilRoot>
              {/* <RecoilObserver /> */}
              {/* <RouterGuard> */}
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
              {/* </RouterGuard> */}
            </RecoilRoot>
          </ApolloProvider>
        </QueryClientProvider>
    </>
  );
}

export default MyApp;
