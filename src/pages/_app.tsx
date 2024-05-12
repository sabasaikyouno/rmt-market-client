import "@/styles/globals.css";
import { Box } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Box sx={{ bgcolor: "primary.light"}}>
      <Head>
        <title>RMT Market 代行、アカウントデータ、RMTの販売一覧</title>
        <meta name="viewport" content="width=device-width"></meta>
      </Head>
      <Component {...pageProps}/>
    </Box>
  );
}
