import Link from 'next/link';
import Image from 'next/image';

import {getDateString} from '../util';

function ProductGrid({
  data
}) {

  const postContainerStyles = {
    padding: '10px 0px',
    display: 'flex',
    gap: '20px',
    flexDirection: 'column'
  }

  const postStyles = {
    padding: '5px',
    marginBottom: '5px'
  }

  const titleLinkStyles = {
    fontSize: '25px'
  }

  const postMetaStyles = {
    display: 'flex',
    gap: '15px',
    justifyContent: 'space-between',
    paddingBottom: '20px'
  }

  // Return most recent posts first - NOT WORKING IDK WHY
  const sortPostsByDate = (postArr) => postArr.sort(function(a,b){
    if (a.data.date && b.data.date) {
      return new Date(b.data.date) - new Date(a.data.date);
    } else {
      return 0
    }
  });

  const postGroup = sortPostsByDate(data).map((post, i) => {
    if (post.path && post.data) {
      const postPath = post.path;
      const postTitle = post.data.title ? post.data.title : null;
      const postExceprt = post.data.excerpt ? post.data.excerpt : null;

      return (
        <div style={postStyles} key={i}>
          <Image src={post.data.images[0].src} height={200} width={200} alt={post.data.title} href={postPath}  />
          <Link style={titleLinkStyles} href={postPath}>{postTitle}</Link>
          <div style={postMetaStyles}>
            <span>{post.data.author && 'by: ' + post.data.author}</span>
            <span>{post.data.date && getDateString(post.data.date)}</span>
          </div>
          {post.data.excerpt && (
            <div>{postExceprt}</div>
          )}

          <button className="snipcart-add-item"
            data-item-id="2oz-vtj"
            data-item-price="19.99"
            data-item-description="Two ounce vertical tube jig."
            data-item-image="http://res.cloudinary.com/vtapico/image/upload/v1674591752/verticaltubejig.com/product-photos/2oz-blood-red_y5bvqt.jpg"
            data-item-name="2oz Vertical Tube Jig">
            Add to cart
          </button>


        </div>
      )
    } else {
      console.log('missing blog post props', post);
    }
  })

  return (
    <div style={postContainerStyles}>{postGroup}</div>
  )
}

export default ProductGrid
