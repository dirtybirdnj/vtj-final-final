const fs = require("fs");
const matter = require('gray-matter');

const directory_name = __dirname + "/src/pages/";
const blog_dir = __dirname + "/src/pages/blog/";

let fileNames = fs.readdirSync(directory_name);
let blogNames = fs.readdirSync(blog_dir);

let pages = [];
let blogs = [];

// Return most recent posts first - NOT WORKING IDK WHY
const sortPostsByDate = (postArr) => postArr.sort(function(a,b){
  if (a.data.date && b.data.date) {
    return new Date(b.data.date) - new Date(a.data.date);
  } else {
    return 0
  }
});

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

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  publicRuntimeConfig: {
    pages: pages,
    blogs: sortPostsByDate(blogs)
  }
})

