var cloudinary = require('cloudinary');
require('dotenv').config({path: './.env.local'});

async function getImages (){

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, // add your cloud_name
    api_key: process.env.CLOUDINARY_KEY, // add your api_key
    api_secret: process.env.CLOUDINARY_SECRET, // add your api_secret
    secure: true
  });

  // const rootFolders = await getRootFolders(cloudinary);
  // console.log(rootFolders);
  //process.exit();

  try{

    return cloudinary.v2
    .search.expression(
    'folder:verticaltubejig.com/vtj_research/*' // add your folder
    ).sort_by('public_id','desc').max_results(30).execute()
    .then((result)=>{
      return result;
    }).catch((err) =>{
      console.log('something went wrong',err)
    });

  } catch(e){
    console.log('err',e,'err');
  }

}

// node fetchCDNPhotos.js | pbcopy
async function outputJSON(){

  const imageData = await getImages().then((result) => {

    result.resources.forEach((photo) => {
      photo.src = photo.url;
      photo.smaller = photo.url;
      console.log(photo)
      console.log("\,")
    })

  });

}

async function getRootFolders(cloudinary){

  try {
    const folders = await cloudinary.api.root_folders();
    return folders;
  } catch (e){
    console.log('err',e)
  }
}

outputJSON();
