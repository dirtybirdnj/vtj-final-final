import Link from 'next/link';
import Image from 'next/image';

function FeaturedBlog({
  featuredBlog,
  pageData,
  currentRoute
}) {

  const imgStyle = {
    maxWidth: '100px'
  }

  const containerStyles = {

    margin: '0px auto',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

  }

  //console.log(featuredBlog)

  return (

      <div style={containerStyles}>
        <h3>Featured Post</h3>
        <Image src={featuredBlog.data.images[0].src} width="200" height="100" alt={featuredBlog.data.title}/>
        <p>{featuredBlog.data.title}</p>
        <p>{featuredBlog.data.author}</p>
        <p>{featuredBlog.data.created}</p>
        <p>{featuredBlog.data.excerpt}</p>
        <Link href={featuredBlog.path}>Read More</Link>
      </div>
  )
}

export default FeaturedBlog;
