import { useState, useEffect } from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';
import Gallery from "react-photo-gallery";
import { homePagePhotos } from '@/galleries/homepage';
import { galleryPhotos } from '@/galleries/gallery';

import Header from './header';
import Posts from './posts';
import {getDateString} from '../util';

export default function Layout({ children }) {
  const router = useRouter();
  const currentRoute = router.pathname;
  const config = getConfig();
  const pageData = config.publicRuntimeConfig.pages;
  const blogData = config.publicRuntimeConfig.blogs;
  const [activePage, setActivePage] = useState(null);
  const [showPosts, setShowPosts] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [showTitle,setShowTitle] = useState(false);

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
    flexDirection: 'column',
    flexGrow: 1,
    gap: '10%',
    paddingBottom: '40px'
  }

  const tagContainerStyles = {
    display: 'flex',
    gap: '15px',
    fontSize: '12px',
  }

  const tagStyles = {
    background: '#ccc',
    padding: '3px 6px',
    borderRadius: '2px'
  }

  const postMetaStyles = {
    display: 'flex',
    gap: '15px',
    justifyContent: 'space-between',
    paddingBottom: '20px'
  }

  const blogTitleStyles = {
    marginBottom: '10px'
  }

  // Show title, date and/or author
  const postHeader = isPost ? (
    <div style={postMetaStyles}>
      <span>{activePage.data.author && 'by: ' + activePage.data.author}</span>
      <span>{activePage.data.date && getDateString(activePage.data.date)}</span>
    </div>
  ) : null;

  const tags = activePage && activePage.data.tags ?
    activePage.data.tags.map((tag, i) => {
      return (
        <div style={tagStyles} key={i}>{tag}</div>
      )
    })
   : null;




  // This is getting the markdown for the current page by the current route (url, e.g. '/about')
  useEffect(() => {
    if (currentRoute && pageData) {
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
      setShowPosts(currentRoute.includes('blog') && !currentRoute.includes('/blog/'));

      // Set conditional to show if you are viewing a post
      setIsPost(currentRoute.includes('/blog/'));

      //if the currentRoute is in the noTitles array, prevent showing it
      const hideTitle = ['/','/gallery','/photos','/blog'];
      setShowTitle(!hideTitle.includes(currentRoute));

    }
  }, [currentRoute, pageData, blogData]);

  useEffect(() => {
    console.log('activePage', activePage);
    console.log('currentRoute', currentRoute);
  }, [activePage]);

  return (
    <div style={containerStyles}>
      <Header pageData={pageData} currentRoute={currentRoute} />
      <main style={mainStyles}>{activePage ? (
        <div>
          {(activePage.data.title && showTitle) && (
            <h1 style={blogTitleStyles}>{activePage.data.title}</h1>
          )}
          {postHeader && postHeader}
          {currentRoute === '/gallery' && (
            <div>
              <Gallery photos={galleryPhotos} />
            </div>
          )}
          {currentRoute === '/' && (
            <div>
              <Gallery photos={homePagePhotos} />
            </div>
          )}
          <Markdown>{activePage.content}</Markdown>
          {tags && (
            <div style={tagContainerStyles}>
              {tags}
            </div>
          )}
        </div>
        ) : '404'}
      {showPosts && (
        <div>
          <h1 style={blogTitleStyles}>{activePage.data.title}</h1>
          <Posts data={blogData} />
        </div>
      )}
      </main>
      <footer>
        <div>This is my footer</div>
      </footer>
    </div>
  );
}