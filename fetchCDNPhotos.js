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
//    'resource_type:image AND folder:verticaltubejig.com/gallery_masonry/*' // photos page
    'folder:verticaltubejig.com/homepage_masonry/*' // photos page
//    'folder:verticaltubejig.com/vtj_research/*' // add your folder
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

//Maybe useful later? did this with a var string instead
function smallerUrl(url){
  let pieces = url.split('/');
  const baseURL = pieces.slice(0,6).join('/');
  const folderPathFile = pieces.slice(6).join('/')
  return `${baseURL}/w_200,c_scale/${folderPathFile}`;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// node fetchCDNPhotos.js | pbcopy
async function outputJSON(){

  const imageData = await getImages().then((result) => {

    // console.log(result.total_count, result.resources.length)
    // process.exit();

    //console.log('export const galleryPhotos = ['); // for pasting into gallery.js file
    console.log('export const homePagePhotos = ['); // for pasting into homepage.js file


    const photos = result.resources;
    // const randomOrder = shuffleArray(photos)

    //randomOrder.forEach((photo) => {
    photos.forEach((photo) => {

      //console.log(photo)

      const eachPhoto = {};

      const srcSizes = ['500', '800', '1024', '1600'];
      let srcSetSizes = [];
      srcSizes.forEach((size) => srcSetSizes.push(`${process.env.CLOUDINARY_URL}/w_${size},c_scale/${process.env.CLOUDINARY_ID}/${photo.folder}/${photo.filename}.${photo.format} ${size}w`))

      //500w, 800w, 1024w, 1600w
      const srcSet = {
        srcSet: srcSetSizes,
        sizes: ["(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw"],
        width: Math.round(photo.width / 1000),
        height: Math.round(photo.height / 1000)
      }

      eachPhoto.src = photo.secure_url;
      eachPhoto.srcSet = srcSetSizes;
      eachPhoto.width = photo.width;
      eachPhoto.height = photo.height;

      console.log(eachPhoto)
      console.log("\,")
    })

    console.log('];') // for pasting into gallery.js file

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
