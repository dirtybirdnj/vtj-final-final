const axios = require('axios');

//https://photos.app.goo.gl/hoyMREyPAMBSLn5EA
const gphotosRegex = /\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)"/g

function extractPhotos(content) {
 const links = new Set()
  let match
  while (match = gphotosRegex.exec(content)) {
    links.add(match[1])
  }
  return Array.from(links)
}

const getAlbum = async function (id) {
  const response = await axios.get(`https://photos.app.goo.gl/${id}`)

  //console.log(response);

  const photoData = extractPhotos(response.data)

  console.log(photoData);

  return photoData
}

//let galleryPhotos = getAlbum('hoyMREyPAMBSLn5EA');

console.log(getAlbum('hoyMREyPAMBSLn5EA'))

//console.log(galleryPhotos);