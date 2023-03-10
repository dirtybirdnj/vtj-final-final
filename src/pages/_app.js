import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import '../styles/globals.css';
import Script from 'next/script';
import Head from 'next/head';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link
          rel="stylesheet"
          href="https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.css"
        />
      </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    <div
        id="snipcart"
        data-api-key="M2IyMmNmYTEtNjQ0Yi00MjI2LTkwOTMtZGIxOWY0MDZlNTgzNjM3MTI0MDkxNTc3MzgyMDA3"
        data-config-modal-style="side"
        hidden
      ></div>
      <Script src="https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.js" />
    </>
  );
}
export default App;