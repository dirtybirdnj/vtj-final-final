import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import '../styles/globals.css';
import Script from 'next/script';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

function App({ Component, pageProps }) {

  return (
    <>
      <Head>

      </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    <div
        id="snipcart"
        data-api-key="M2VlNGU3NWMtNjAxMS00ZjEwLWI0YmMtYTdlN2ZkYjMxZDI1NjM4MTkzMjI1MDQ5MTAxMjg2"
        data-config-modal-style="side"
        hidden
      ></div>
      <Script src="https://cdn.snipcart.com/themes/v3.4.1/default/snipcart.js" />
      <Analytics />
    </>
  );
}
export default App;