const fs = require("fs").promises;

const pages = fs.readdir(__dirname + "/src/pages/").then(console.log);

// This is annoyingly not working
// const getPages = async () => {
//   const pages = await fs.readdir(__dirname + "/src/pages/");
//   console.log('pages');

//   return pages
// }

// const pages = getPages();
// console.log('pages', pages);

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

module.exports = withMDX({
  pageExtensions: ['md', 'mdx'],
  publicRuntimeConfig: {
    pages: pages
  } 
})