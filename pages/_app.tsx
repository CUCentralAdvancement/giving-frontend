import React from "react";
import type { AppProps /*, AppContext */ } from 'next/app'
// import App from 'next/app'
// import { StateProvider } from "../data/store";
import { RecoilRoot } from "recoil";
import "../components/fund-search/algolia.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <RecoilRoot>
        <>
          <Component {...pageProps} />
          <div id="portal-root"></div>
        </>
      </RecoilRoot>
    </React.StrictMode>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
