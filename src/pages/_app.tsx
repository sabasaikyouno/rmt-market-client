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
        <meta name="description" content="安全性と信頼性の高いRMTサービスを厳選。オンラインゲームのアイテム販売やキャラクター育成代行など、国内外の人気RMTサイトから販売情報をまとめています。"></meta>
      </Head>
      <Component {...pageProps}/>
    </Box>
  );
}
