import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import '../styles/globals.css';
import getConfig from 'next/config'

function App({ Component, pageProps }) {
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
  const [pagesDir, setPagesDir] = useState(null);

  console.log('publicRuntimeConfig', publicRuntimeConfig);

  useEffect(() => {
    if (publicRuntimeConfig) {
      setPagesDir(publicRuntimeConfig);
    }
  }, [publicRuntimeConfig]);

  useEffect(() => {
    if (pagesDir)
      console.log('pagesDir', pagesDir);
  }, [pagesDir])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default App;