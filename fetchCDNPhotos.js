var cloudinary = require('cloudinary');
require('dotenv').config({path: './.env.local'});

async function getImages (){

  cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, // add your cloud_name
  api_key: process.env.CLOUDINARY_KEY, // add your api_key
  api_secret: process.env.CLOUDINARY_SECRET, // add your api_secret
  secure: true
  });

  const result = await cloudinary.v2.api
  .resources()
  .then((result)=>{
    //console.log(result) // ACTUAL RESULTS
    return result; // Y U NO RETURN?! YOU ARE RESOLVED! WTFTTTTFFJFSDLKJSDKJHSDKJHFSDHKJFNHK
  }).catch((err) =>{
    console.log('something went wrong',err)
  });

}

const images = getImages();
console.log(images); //Promise { <pending> }
