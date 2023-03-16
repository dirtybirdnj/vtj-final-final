import Link from 'next/link';
import Image from 'next/image';
import { ButtondownForm } from 'react-buttondown'
import 'react-buttondown/dist/react-buttondown.css'

function Newsletter({
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

  const BD_API_KEY = process.env.BD_API_KEY;
  const handleOnSubscribe = subscriber => {

    //new BD subscriber
    console.log('new sub',subscriber);

   }

  return (

      <div style={containerStyles}>
        <h3>Sign up for our newsletter</h3>
        <p>and get the DROP on the next batch of lures to go on sale!</p>
        <ButtondownForm
          apiKey={BD_API_KEY}
          onSubscribe={handleOnSubscribe}
        />
      </div>
  )
}

export default Newsletter;
