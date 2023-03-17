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

const Product = styled.div`
  display: flex;
  gap: 20px;
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

      return (
        <Product key={i}>
          <ImageEl onClick={() => router.push(postPath)} src={post.data.images[0].src} height={200} width={200} alt={post.data.title} href={postPath}  />
          <Meta>
            <Title href={postPath}>{postTitle}</Title>
            {post.data.excerpt && (
              <Description>{postExceprt}</Description>
            )}

            <ButtonEl className="snipcart-add-item"
              data-item-id="2oz-vtj"
              data-item-price="19.99"
              data-item-description="Two ounce vertical tube jig."
              data-item-image="http://res.cloudinary.com/vtapico/image/upload/v1674591752/verticaltubejig.com/product-photos/2oz-blood-red_y5bvqt.jpg"
              data-item-name="2oz Vertical Tube Jig">
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
    <ProductContainer>{postGroup}</ProductContainer>
  )
}

export default ProductGrid
