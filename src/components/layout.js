
import { useState, useEffect } from 'react';
import Header from './header';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import Markdown from 'markdown-to-jsx';
import { render } from 'react-dom';

export default function Layout({ children }) {
  const router = useRouter();
  const currentRoute = router.pathname;
  const config = getConfig();
  const pageData = config.publicRuntimeConfig.pages;
  const [activePage, setActivePage] = useState(null);

  useEffect(() => {
    if (currentRoute && pageData) {
      pageData.forEach((page, i) => {
        if (page.path === currentRoute) {
          setActivePage(page.content);
        }
      })
    }
  }, [currentRoute, pageData])

  return (
    <div>
      <Header pageData={pageData} currentRoute={currentRoute} />
      <main>{activePage ? (<Markdown>{activePage}</Markdown>) : '404'}</main>
      <footer>
        <div>This is my footer</div>
      </footer>
    </div>
  );
}