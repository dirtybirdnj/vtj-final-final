const fs = require("fs");
const directory_name = __dirname + "/src/pages/";

// Function to get current filenames
// in directory
let filenames = fs.readdirSync(directory_name);
let pages = []
  
filenames.forEach((file) => {
  if (file.includes('.md')) {
    pages.push(file);
    fs.readFile(directory_name + file, 'utf8', (err, data) => {
      console.log('err', err);
      console.log('data', data);
    });
  }
});

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  publicRuntimeConfig: {
    pages: pages
  }
})

