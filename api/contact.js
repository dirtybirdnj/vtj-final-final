const postmark = require('postmark');
const client = new postmark.ServerClient('e00a4c55-00ac-41a5-84f0-992b0dafbe53');

const message = {
  From: 'orders@verticaltubejig.com',
  To: 'matgilbert@gmail.com',
  Subject: 'Test Email',
  TextBody: 'Hello from Postmark!'
};

client.sendEmail(message)
  .then((response) => {
    console.log('Email sent:', response);
  })
  .catch((error) => {
    console.error('Error sending email:', error);
  });