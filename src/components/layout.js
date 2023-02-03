
import { useState, useEffect } from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';

import Header from './header';

export default function Layout({ children }) {
  const router = useRouter();
  const currentRoute = router.pathname;
  const config = getConfig();
  const pageData = config.publicRuntimeConfig.pages;
  const blogData = config.publicRuntimeConfig.blogs;
  const [activePage, setActivePage] = useState(null);
  const [showPosts, setShowPosts] = useState(false);

  // Temp styles
  const containerStyles = {
    maxWidth: '750px',
    minHeight: 'calc(100vh - 100px)',
    padding: '50px 5%',
    margin: '0px auto',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  }

  const mainStyles = {
    display: 'flex',
    flexGrow: 1,
    gap: '3%'
  }

  const postStyles = {
    flex: '0 0 30%'
  }

  const postListStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  }

  const tagContainerStyles = {
    display: 'flex',
    gap: '15px',
    fontSize: '12px'
  }

  const tagStyles = {
    background: '#ccc',
    padding: '3px 6px',
    borderRadius: '2px'
  }

  const blogLinks = blogData.map((post, i) => {
    if (post.path && (post.data.nav || post.data.title)) {
      const postPath = post.path;
      const postTitle = post.data.title;

      return <Link key={i} className={currentRoute === post.path ? 'active' : ''} href={postPath}>{postTitle}</Link>
    } else {
      console.log('missing blog post props', post);
    }

  })

  const tags = activePage && activePage.data.tags ? 
    activePage.data.tags.map((tag, i) => {
      return (
        <div style={tagStyles} key={i}>#{tag}</div>
      )
    })
   : null;

  // This is getting the markdown for the current page by the current route (url, e.g. '/about')
  useEffect(() => {
    if (currentRoute && pageData) {
      console.log('currentRoute', currentRoute);
      if (currentRoute.includes('/blog/')) {
        blogData.forEach((page, i) => {
          if (page.path === currentRoute) {
            setActivePage(page);
          }
        })
      } else {
        pageData.forEach((page, i) => {
          if (page.path === currentRoute) {
            setActivePage(page);
          }
        })
      }

      // Set conditional to show posts if you are on a blog page
      setShowPosts(currentRoute.includes('blog'));      
    }
  }, [currentRoute, pageData, blogData]);

  useEffect(() => {
    console.log('activePage', activePage);
  }, [activePage]);

  return (
    <div style={containerStyles}>
      <Header pageData={pageData} currentRoute={currentRoute} />
      <main style={mainStyles}>{activePage ? (
        <div>
          <Markdown>{activePage.content}</Markdown>
          {tags && (
            <div style={tagContainerStyles}>
              {tags}
            </div>
          )}  
        </div>
      ) : '404'}
      {showPosts && (
        <div style={postStyles}>
          <h2>Posts</h2>
          <div style={postListStyles}>
            {blogLinks}
          </div>
        </div>
      )}
      </main>
      <footer>
        <div>This is my footer</div>
      </footer>
    </div>
  );
}