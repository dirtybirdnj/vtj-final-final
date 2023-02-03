const fs = require("fs");
const matter = require('gray-matter');

const directory_name = __dirname + "/src/pages/";

// Function to get current filenames
// in directory
let filenames = fs.readdirSync(directory_name);
let pages = [];
  
filenames.forEach((file, i) => {
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

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  options: {
    providerImportSource: '@mdx-js/react',
  },
  publicRuntimeConfig: {
    pages: pages
  }
})

