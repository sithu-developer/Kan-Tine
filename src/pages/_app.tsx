
import Layout from "@/components/layout";
import { store } from "@/store";
import "@/styles/globals.css";
import { theme } from "@/util/theme";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps : { session, ...pageProps } }: AppProps) {
  return     (
  <SessionProvider session={session}>
    <Provider store={store}>
      <LocalizationProvider adapterLocale={AdapterDayjs} >
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </LocalizationProvider>
    </Provider> 
  </SessionProvider>
  );
}
