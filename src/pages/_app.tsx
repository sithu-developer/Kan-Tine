
import Layout from "@/components/layout";
import { store } from "@/store";
import "@/styles/globals.css";
import { theme } from "@/util/theme";
import { ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps : { session, ...pageProps } }: AppProps) {
  console.log("app page : " , session )
  return     (
  <SessionProvider session={session}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </ThemeProvider>
    </Provider> 
  </SessionProvider>
  );
}
