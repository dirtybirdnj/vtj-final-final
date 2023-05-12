// pages/api/sendEmail.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    try {
      const response = await axios.post('https://api.postmarkapp.com/email', {
        From: 'info@verticaltubejig.com',
        To: 'matgilbert@gmail.com',
        Subject: 'New Contact Form Submission',
        TextBody: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `,
      }, {
        headers: {
          'X-Postmark-Server-Token': process.env.POSTMARK_API_KEY,
          'Content-Type': 'application/json',
        },
      });

      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}