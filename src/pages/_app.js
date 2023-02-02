import Layout from '../components/layout';
import '../styles/globals.css';
import getConfig from 'next/config'

function App({ Component, pageProps }) {
  console.log('getConfig', getConfig());
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default App;