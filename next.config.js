const fs = require("fs");
const matter = require('gray-matter');
const axios = require('axios');

const directory_name = __dirname + "/src/pages/";
const blog_dir = __dirname + "/src/pages/blog/";

let fileNames = fs.readdirSync(directory_name);
let blogNames = fs.readdirSync(blog_dir);

let pages = [];
let blogs = [];
let galleryPhotos = getAlbum('hoyMREyPAMBSLn5EA');

console.log(galleryPhotos);

// Gets Blog Names
blogNames.forEach((file, i) => {
  if (file.includes('.md')) {
    fs.readFile(blog_dir + file, 'utf8', (err, data) => {
      if (data) {

        const strippedPath = file.split('.')[0];
        const pathStr = strippedPath.includes('index') ? '/blog' : '/blog/' + strippedPath;
        const pageProps = matter(data);

        if (file.includes('index')) {
          pages.push({
            file: file,
            path: pathStr,
            ...pageProps
          })
        } else {
          blogs.push({
            file: file,
            path: pathStr,
            ...pageProps
          })
        }
      }
    });
  }
});

// Gets current file names in directory
fileNames.forEach((file, i) => {
  if (file.includes('.md')) {
    fs.readFile(directory_name + file, 'utf8', (err, data) => {
      if (data) {
        const strippedPath = file.split('.')[0];
        const pathStr = strippedPath.includes('index') ? '/' : '/' + strippedPath;
        const pageProps = matter(data);

        pages.push({
          file: file,
          path: pathStr,
          ...pageProps
        })
      }
    });
  }
});

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

 async function getAlbum(id) {
   const response = await axios.get(`https://photos.app.goo.gl/${id}`)
   return extractPhotos(response.data)
 }

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  publicRuntimeConfig: {
    pages: pages,
    blogs: blogs
  }
})
