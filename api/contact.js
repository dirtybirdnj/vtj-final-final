const postmark = require('postmark');
const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

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