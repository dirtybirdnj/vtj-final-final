var cloudinary = require('cloudinary');
require('dotenv').config({path: './.env.local'});

function getImages (){

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, // add your cloud_name
    api_key: process.env.CLOUDINARY_KEY, // add your api_key
    api_secret: process.env.CLOUDINARY_SECRET, // add your api_secret
    secure: true
  });

  try{

    console.log('try')
    return cloudinary.v2.api
    .resources()
    .then((result)=>{
      return result;
    }).catch((err) =>{
      console.log('something went wrong',err)
    });

  } catch(e){
    console.log(e);
  }

}

async function outputJSON(){

  const imageData = await getImages().then((result) => {

    result.resources.forEach((photo) => {
      console.log(photo)
    })

  });

}

outputJSON();
