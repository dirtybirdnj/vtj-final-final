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
    ).sort_by('public_id','desc').max_results(100).execute()
    .then((result)=>{
      return result;
    }).catch((err) =>{
      console.log('something went wrong',err)
    });

  } catch(e){
    console.log('err',e,'err');
  }

}

function smallerUrl(url){

  let pieces = url.split('/');

  // console.log(pieces);
  // process.exit();

  const baseURL = pieces.slice(0,6).join('/');
  const folderPathFile = pieces.slice(6).join('/')

  //const file = pieces.pop();
  //return pieces.join('/') + '//smallerurl';

  return `${baseURL}/w_200,c_scale/${folderPathFile}`;

}

// node fetchCDNPhotos.js | pbcopy
async function outputJSON(){

  const imageData = await getImages().then((result) => {

    // console.log(result.total_count, result.resources.length)
    // process.exit();

    result.resources.forEach((photo) => {

      const eachPhoto = {};

      //eachPhoto.src = photo.url;
      eachPhoto.smaller = smallerUrl(photo.url);
      eachPhoto.
      eachPhoto.width = photo.width;
      eachPhoto.height = photo.height;
      eachPhoto.aspect_ratio = photo.aspect_ratio
      console.log(eachPhoto)
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
