import React from 'react';
import PropTypes from 'prop-types';
import { DonorProvider } from '../data/contexts/DonorContext';
import '../components/fund-search/algolia.css';
import '../styles/global.css';

MyApp.propTypes = {
  Component: PropTypes.any.isRequired,
  pageProps: PropTypes.any.isRequired,
};

function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <DonorProvider>
        <>
          <Component {...pageProps} />
          <div id='portal-root'></div>
        </>
      </DonorProvider>
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
