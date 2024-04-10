import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <title>hi</title>
        <meta name="viewport" content="width=device-width"></meta>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
