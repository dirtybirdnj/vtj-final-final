import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import {getDateString} from '../util';

const ProductContainer = styled.div`
  display: flex;
  gap: 30px;
  padding-bottom: 30px;
  flex-direction: column;
`;

const Title = styled(Link)`
  font-size: 25px;
  display: block;
  text-decoration: none;
  padding-bottom: 10px;
`;

const SubtitleContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const Subtitle = styled.div`
  font-size: 14px;
  padding-bottom: 10px;
`;

const Description = styled.div`
  padding-bottom: 30px;
`;

const Meta = styled.div`

`;

const ImageEl = styled(Image)`
  cursor: pointer;
`;

const ButtonEl = styled.button`
  padding: 10px 15px;
  border: none;
  cursor: pointer;
`;

const Product = styled.div`
  display: flex;
  gap: 20px;
  padding-bottom: 25px;

  @media only screen and (max-width: 559px) {
    flex-direction: column;

    img {
      width: 100%;
      height: auto;
    }

    ${Description} {
      padding-bottom: 10px;
    }

    ${ButtonEl} {
      width: 100%;
    }
  }
`;

function ProductGrid({
  data
}) {
  const router = useRouter();

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

      const productURL = process.env.NEXT_PUBLIC_SITE_URL + postPath

      console.log(post.data)

      return (
        <Product key={i}>
          <ImageEl src={post.data.images[0].src} height={200} width={200} alt={post.data.title} href={postPath}  />
          <Meta>
            <Title href={postPath}>{postTitle}</Title>
            {post.data.excerpt && (
              <Description>{postExceprt}</Description>
            )}

            <ButtonEl className="snipcart-add-item"
              data-item-id={post.data['snipcart-id']}
              data-item-url={productURL}
              data-item-price={post.data.price}
              data-item-description={post.data.description}
              data-item-image={post.data.images[0].src}
              data-item-name={post.data.title}
              data-item-hooktype-name="Hook Type"
              data-item-hooktype-type="readonly"
              data-item-hooktype-value={post.data.hooktype}
              data-item-weight={post.data.weight}
              data-item-quantity={1}
              data-item-taxable={true}
              >
              Add to cart
            </ButtonEl>
          </Meta>
        </Product>
      )
    } else {
      console.log('missing blog post props', post);
    }
  })

  return (

    <>
        <p>If you would like to place an order please contact us via email or Facebook. </p>

        <p>We currently accept Venmo and will soon have secure online order processing.</p>

        <h3>Orders on hold for the moment!</h3>

        <p>Please feel free to reach out but sign up for the newsletter to get the drop when we can actually sell some lures. Thank you for your patience!</p>
        {/*
        <p>The store is just getting started so please allow 3-5 days for shipping. If you would like to pick up your order locally that is possible too! We are located in Huntington and can meet people in the Burlington or Waterbury areas.</p>
        */}
        <p>Thank you for your support!</p>
    </>
  )
}

export default ProductGrid
