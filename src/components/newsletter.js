import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { ButtondownForm } from 'react-buttondown';
import 'react-buttondown/dist/react-buttondown.css';

const NewsletterContainer = styled.div`
  h3 {
    margin-bottom: 10px;
  }

  button {
    align-self: stretch;
  }
`;

function Newsletter({
  pageData,
  currentRoute
}) {  
  const handleOnSubscribe = subscriber => {
    //new BD subscriber
    console.log('new sub',subscriber);
   }

  return (
    <NewsletterContainer>
      <h3>Sign up for our newsletter</h3>
      <p>Get the DROP on the next batch of lures to go on sale!</p>
      <ButtondownForm
        apiKey={process.env.BD_API_KEY}
        onSubscribe={handleOnSubscribe}
      />
    </NewsletterContainer>
  )
}

export default Newsletter;
