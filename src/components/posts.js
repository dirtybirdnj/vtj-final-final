import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import {getDateString} from '../util';

const Post = styled.div`
  display: flex;
  gap: 30px;
  align-items: flex-start;
`;

const TagsContainer = styled.div`
  display: flex;
  padding-top: 10px;
  gap: 5px;
  justify-content: flex-end;
`;

const Tag = styled.div`
  background: #ccc;
  font-size: 10px;
  padding: 3px 6px;
  border-radius: 2px;
`;

const ImageEl = styled.div`
  background: url(${props => props.url}) no-repeat center;
  background-size: cover;
  width: 35%;
  aspect-ratio: 5 / 3;
  flex-shrink: 0;
  cursor: pointer;
`;

const Title = styled(Link)`
  font-size: 25px;
  text-decoration: none;
  padding-bottom: 5px;
  display: block;
`;

const SubtitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const Subtitle = styled.div`
  opacity: 0.8;
  font-size: 15px;
  padding-bottom: 20px;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostsContainer = styled.div`
  padding: 10px 0px;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  flex-direction: column;

  @media only screen and (max-width: 559px) {
    ${Post} {
      flex-direction: column;
      padding-bottom: 20px;
    }
  }
`;

const MobilePostTop = styled.div`
  display: flex;
  gap: 10px;
  padding-bottom: 20px;
  align-items: flex-start;
`;

const MobileTitleContainer = styled.div`
  flex-grow: 1;
`;

const DesktopContainer = styled.div`
  display: flex;
  gap: 20px;
  padding-bottom: 20px;
  align-items: flex-start;

  @media only screen and (max-width: 559px) {
    display: none;
  }
`;

const MobileContainer = styled.div`
  display: none;

  @media only screen and (max-width: 559px) {
    display: block;
  }

  ${Title} {
    padding-bottom: 5px;
  }

  ${Subtitle} {
    padding-bottom: 3px;

    strong {
      padding-bottom: 2px;
    }
  }

  ${ImageEl} {
    width: 30%;
    aspect-ratio: 1 / 1;
    position: relative;
  }
`;

export function Posts({
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

      const tags = post.data.tags.map((tag, i) => (
        <Tag key={i}>{tag}</Tag>
      ));

      return (
        <Post key={i}>
          <DesktopContainer>
            {post.data.images && (<ImageEl onClick={() => router.push(postPath)} url={post.data.images[0].src} />)}
            <Meta>
              <Title href={postPath}>{postTitle}</Title>
              <SubtitleContainer>
                <Subtitle>by {post.data.author}</Subtitle>
                <Subtitle>{getDateString(post.data.date)}</Subtitle>
              </SubtitleContainer>
              {post.data.excerpt && (
                <div>{postExceprt}</div>
              )}
              {tags && (
                <TagsContainer>{tags}</TagsContainer>
              )}
            </Meta>        
          </DesktopContainer>
          <MobileContainer>
            <MobilePostTop>
              {post.data.images && (<ImageEl onClick={() => router.push(postPath)} url={post.data.images[0].src} />)}
              <MobileTitleContainer>
                <Title href={postPath}>{postTitle}</Title>
                <Subtitle><strong>Posted: {getDateString(post.data.date)}</strong></Subtitle>
                <Subtitle>By {post.data.author}</Subtitle>
              </MobileTitleContainer>
            </MobilePostTop>
            <Meta>              
              {post.data.excerpt && (
                <div>{postExceprt}</div>
              )}
              {tags && (
                <TagsContainer>{tags}</TagsContainer>
              )}
            </Meta>
          </MobileContainer>  
        </Post>
      )
    } else {
      console.log('missing blog post props', post);
    }
  })

  return (
    <PostsContainer>{postGroup}</PostsContainer>
  )
}
  
export function FeaturedBlog({
  featuredBlog,
  pageData
}) {
  const router = useRouter();

  const tags = featuredBlog.data.tags.map((tag, i) => (
        <Tag key={i}>{tag}</Tag>
      ));

  return (
    <Post>
      <DesktopContainer>
        {featuredBlog.data.images && (<ImageEl onClick={() => router.push(featuredBlog.path)} url={featuredBlog.data.images[0].src} />)}
        <Meta>
          <Title href={featuredBlog.path}>{featuredBlog.data.title}</Title>
          <SubtitleContainer>
            <Subtitle>by {featuredBlog.data.author}</Subtitle>
            <Subtitle>{getDateString(featuredBlog.data.date)}</Subtitle>
          </SubtitleContainer>
          {featuredBlog.data.excerpt && (
            <div>{featuredBlog.data.excerpt}</div>
          )}
          {tags && (
            <TagsContainer>{tags}</TagsContainer>
          )}
        </Meta>        
      </DesktopContainer>
      <MobileContainer>
        <MobilePostTop>
          {featuredBlog.data.images && (<ImageEl onClick={() => router.push(featuredBlog.path)} url={featuredBlog.data.images[0].src} />)}
          <MobileTitleContainer>
            <Title href={featuredBlog.path}>{featuredBlog.data.title}</Title>
            <Subtitle><strong>Posted: {getDateString(featuredBlog.data.date)}</strong></Subtitle>
            <Subtitle>By {featuredBlog.data.author}</Subtitle>
          </MobileTitleContainer>
        </MobilePostTop>
        <Meta>              
          {featuredBlog.data.excerpt && (
            <div>{featuredBlog.data.excerpt}</div>
          )}
          {tags && (
            <TagsContainer>{tags}</TagsContainer>
          )}
        </Meta>
      </MobileContainer>  
    </Post>
  )

}
