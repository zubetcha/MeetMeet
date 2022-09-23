import { Html, Head, Main, NextScript } from "next/document";


export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta property="og:title" content="MeetMeet"></meta>
        <meta property="og:description" content="젠틀에너지 회의실 예약 관리"></meta>
        <link rel="shortcut icon" href="/favicon.ico"></link>
        <link rel="manifest" href="/manifest.json"></link>
        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
