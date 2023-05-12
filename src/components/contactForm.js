import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link'
import { BsFacebook, BsInstagram, BsEnvelopeAtFill } from 'react-icons/bs';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, email, message };
    try {
      const response = await axios.post('/api/send-email', data);
      console.log(response);
      // Handle success
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (

      <>
      <Image src="https://res.cloudinary.com/vtapico/image/upload/v1683918897/verticaltubejig.com/20220212_084144_j6spgi_cf42a0.jpg" width={2752} height={1681} alt="say hello to my friend!" layout="responsive"/>
        <p>If you would like to order a VTJ, dressed treble or some merch please use the online store. The link above that says &quot;shop&quot; will always show the latest products.</p>
        <p>If you want to request something specific or just give us a shout you can find us on facebook and instagram!</p>
        <p>We will try to respond as soon as possible but please understand this is one guy trying to start a side hustle. Please be patient and understanding, we appreciate your support so much.</p>
        <p><Link href="https://www.facebook.com/verticaltubejig" target="_blank"><BsFacebook/>https://www.facebook.com/verticaltubejig</Link></p>
        <p><Link href="https://www.instagram.com/verticaltubejig" target="_blank"><BsInstagram/>https://www.instagram.com/verticaltubejig</Link></p>
      </>

  );
}

export default ContactForm;