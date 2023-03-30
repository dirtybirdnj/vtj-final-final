import { useState, useEffect } from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import Markdown from 'markdown-to-jsx';
import Link from 'next/link';
import Image from 'next/image';
import Gallery from "react-photo-gallery";
import { homePagePhotos } from '@/galleries/homepage';
import { galleryPhotos } from '@/galleries/gallery';


import Header from './header';
import Footer from './footer';
import { FeaturedBlog, Posts } from './posts';
import ProductGrid from './product-grid';
import Newsletter from './newsletter';

import {getDateString} from '../util';

export default function Layout({ children }) {
  const router = useRouter();
  const currentRoute = router.pathname;
  const config = getConfig();
  const pageData = config.publicRuntimeConfig.pages;
  const blogData = config.publicRuntimeConfig.blogs;
  const productData = config.publicRuntimeConfig.products;
  const [activePage, setActivePage] = useState(null);
  const [showPosts, setShowPosts] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [showTitle,setShowTitle] = useState(false);

  const [showProducts, setShowProducts] = useState(false);

//console.log(activePage);

  // Temp styles
  const containerStyles = {
    maxWidth: '750px',
    minHeight: 'calc(100vh - 100px)',
    padding: '0 5%',
    margin: '0px auto',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  }

  const mainStyles = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    gap: '10%'
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

  const imgStyle = {
    width: '100px'
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

  //TODO: If no featured blog shown in grey matter, take the global one set in next.fonfig.js
  let blogToFeature = false;

  if(activePage && activePage.data.featuredBlog){
    blogData.forEach((blog) => {
      if(blog.file === activePage.data.featuredBlog){
        blogToFeature = blog;
      }
    })
  }

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

        productData.forEach((page, i) => {
          if (page.path === currentRoute) {
            setActivePage(page);
          }
        })

      }

      // Set conditional to show posts if you are on a blog page
      setShowPosts(currentRoute.includes('blog') && !currentRoute.includes('/blog/'));

      // Set conditional to show posts if you are on a blog page
      setShowProducts(currentRoute.includes('shop') && !currentRoute.includes('/shop/'));

      // Set conditional to show if you are viewing a post
      setIsPost(currentRoute.includes('/blog/'));

      //if the currentRoute is in the noTitles array, prevent showing it
      const hideTitle = ['/','/gallery','/photos','/blog','/shop','/contact'];
      setShowTitle(!hideTitle.includes(currentRoute));

    }
  }, [currentRoute, pageData, blogData, productData]);

  useEffect(() => {
    //console.log('activePage', activePage);
    // console.log('currentRoute', currentRoute);
    // console.log(config)
  }, [activePage]);

  const markdownOptions = {
    overrides: {
      p: {
       component: ({children, ...props}) => {
        //const { node } = children
        console.log(children)

        if (children[0].type === "img") {
          const image = children[0]
          const metastring = image.properties.alt
          const alt = metastring?.replace(/ *\{[^)]*\} */g, "")
          const metaWidth = metastring.match(/{([^}]+)x/)
          const metaHeight = metastring.match(/x([^}]+)}/)
          const width = metaWidth ? metaWidth[1] : "768"
          const height = metaHeight ? metaHeight[1] : "432"
          const isPriority = metastring?.toLowerCase().match('{priority}')
          const hasCaption = metastring?.toLowerCase().includes('{caption:')
          const caption = metastring?.match(/{caption: (.*?)}/)?.pop()

          return (
            <div className="postImgWrapper">
              <Image
                src={image.properties.src}
                width={width}
                height={height}
                className="postImg"
                alt={alt}
                priority={isPriority}
              />
                {hasCaption ? <div className="caption" aria-label={caption}>{caption}</div> : null}
            </div>
          )
        }
        return <p>{children}</p>
      }
    } }
  }


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

          {activePage.data.images &&
            <Gallery photos={activePage.data.images}/>
          }

          <Markdown options={markdownOptions}>{activePage.content}</Markdown>
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

      {showProducts && (
        <div>
          <ProductGrid data={productData}/>
        </div>

      )}

      {blogToFeature &&
      <div>
        <h1>Featured Post</h1>
        <FeaturedBlog featuredBlog={blogToFeature} pageData={pageData} currentRoute={currentRoute} />
      </div>

      }

      </main>

      <Newsletter/>

      <Footer pageData={pageData} currentRoute={currentRoute} />
    </div>
  );
}