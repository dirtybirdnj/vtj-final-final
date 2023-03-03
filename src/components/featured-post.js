import Link from 'next/link';

function FeaturedPost({
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

  return (
      <div style={containerStyles}>
        <h3>Featured Post</h3>
        <p>Title</p>
        <p>Author</p>
        <p >Date</p>
        <p>Bacon ipsum dolor amet spare ribs pastrami ball tip t-bone drumstick boudin ham hock jowl burgdoggen. Jerky pancetta sausage, kielbasa sirloin bresaola buffalo chicken corned beef rump chuck tenderloin pork shoulder. Swine t-bone shank landjaeger porchetta...</p>
        <button>Read More</button>
      </div>
  )
}

export default FeaturedPost;
