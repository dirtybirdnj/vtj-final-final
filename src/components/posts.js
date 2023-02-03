import Link from 'next/link';

import {getDateString} from '../util';

function Posts({
  data
}) {

  const postContainerStyles = {
    padding: '10px 0px',
    display: 'flex',
    gap: '20px',
    flexDirection: 'column'
  }

  const postStyles = {

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

  const postGroup = data.map((post, i) => {
    if (post.path && post.data) {
      const postPath = post.path;
      const postTitle = post.data.title ? post.data.title : null;
      const postExceprt = post.data.excerpt ? post.data.excerpt : null;

      return (
        <div style={postStyles} key={i}>
          <Link style={titleLinkStyles} href={postPath}>{postTitle}</Link>
          <div style={postMetaStyles}>
            <span>{post.data.author && 'by: ' + post.data.author}</span>
            <span>{post.data.date && getDateString(post.data.date)}</span>
          </div>
          {post.data.excerpt && (
            <div>{postExceprt}</div>
          )}
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
  
export default Posts
