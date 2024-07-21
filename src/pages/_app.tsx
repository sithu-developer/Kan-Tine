import Layout from "@/components/layout";
import { store } from "@/store";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps : { session, ...pageProps } }: AppProps) {
  return     (
  <Provider store={store}>
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  </Provider> 
  );
}
