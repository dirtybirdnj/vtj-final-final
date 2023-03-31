import { useState, useEffect } from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import Markdown from 'markdown-to-jsx';
import styled from 'styled-components';
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
  const [isProduct, setIsProduct] = useState(false);
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

  const ButtonEl = styled.button`
  padding: 10px 15px;
  border: none;
  cursor: pointer;
`;

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

      // Set conditional to show if you are viewing a post
      setIsProduct(currentRoute.includes('/shop/'));

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


  const NextImage = ({ children, ...props }) => (
    <div {...props}>{children}</div>
  );

  let NextImageComponent = function ( children, ...props ){

        if (children[0].type === "img") {
          const image = children[0]
          const metastring = image.props.alt

          //Pulling dims isnt working BUT SOMEHOW IMAGES DISPLAY OK?! WHAT?!
          //This was copied from elsewhere and adapted. kinda ugly, maybe could be fised?
          const alt = metastring?.replace(/ *\{[^)]*\} */g, "")
          const metaDimsResult = image.props.alt.match(/({([^}]+)})/)
          //const metaDims = metaDimResult[2].replace(/[{}]/g,'').toString();
          const dims = metaDimsResult[2].split('x');

          //console.log(alt,metaDimsResult,dims)

          const width = dims[0]
          const height = dims[1]

          const isPriority = metastring?.toLowerCase().match('{priority}')
          const hasCaption = metastring?.toLowerCase().includes('{caption:')
          const caption = metastring?.match(/{caption: (.*?)}/)?.pop()

          return (
            <div className="postImgWrapper">
              <Image
                src={image.props.src}
                width={100}
                height={100}
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
                style={{ height: '100%', width: '100%' }}
                className="postImg"
                alt={alt}
                priority={isPriority}
              />
                {hasCaption ? <div className="caption" aria-label={caption}>{caption}</div> : null}
            </div>
          )
        }
        return <p>{children}</p>
    };

  const markdownOptions = {
    overrides: {
      p: {
       component: ({children, ...props}) => {

        if (children[0].type === "img") {
          console.log(children);
          return NextImageComponent(children);
        } else {
          return <p{...props} >{children}</p>
        }

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
          {isProduct &&
            <ButtonEl className="snipcart-add-item"
                data-item-id={activePage.data['snipcart-id']}
                data-item-price={activePage.data.price}
                data-item-description={activePage.data.description}
                data-item-image={activePage.data.images[0].src}
                data-item-name={activePage.data.title}
                data-item-hooktype-name="Hook Type"
                data-item-hooktype-type="readonly"
                data-item-hooktype-value="Single 3/0 Dressed"
            >
            Add to cart
          </ButtonEl>
          }

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

          {isProduct &&
            <ButtonEl className="snipcart-add-item"
                data-item-id={activePage.data['snipcart-id']}
                data-item-price={activePage.data.price}
                data-item-description={activePage.data.description}
                data-item-image={activePage.data.images[0].src}
                data-item-name={activePage.data.title}
                data-item-hooktype-name="Hook Type"
                data-item-hooktype-type="readonly"
                data-item-hooktype-value="Single 3/0 Dressed"
            >
            Add to cart
          </ButtonEl>
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