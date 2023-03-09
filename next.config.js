const fs = require("fs");
const matter = require('gray-matter');
const axios = require('axios');

const directory_name = __dirname + "/src/pages/";
const blog_dir = __dirname + "/src/pages/blog/";
const store_dir = __dirname + "/src/pages/shop/";

let fileNames = fs.readdirSync(directory_name);
let blogNames = fs.readdirSync(blog_dir);
let productNames = fs.readdirSync(store_dir);

let pages = [];
let blogs = [];
let products = [];

//Defaults for pages where there is nothing set in the grey matter
let featuredBlogs = []; //the array that is avaialbale to the front end
let featuredBlog = null; //individual blog to feature in single block

let blogsToFeature = ['hello-store.md','whats-a-vtj.md']; // the user selected blog pages that are featured, in the order they should appear

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

        if(blogsToFeature.includes(file)){
          featuredBlogs.push({
            file: file,
            path: pathStr,
            ...pageProps
          })
        }

      }
    });
  }
});

//Gets Product Names
productNames.forEach((file, i) => {
  if (file.includes('.md')) {
    fs.readFile(store_dir + file, 'utf8', (err, data) => {
      if (data) {

        const strippedPath = file.split('.')[0];
        const pathStr = strippedPath.includes('index') ? '/shop' : '/shop/' + strippedPath;
        const pageProps = matter(data);

        // if (file.includes('index')) {
          pages.push({
            file: file,
            path: pathStr,
            ...pageProps
          })
        // } else {
        //   products.push({
        //     file: file,
        //     path: pathStr,
        //     ...pageProps
        //   })
        // }

        //TODO
        // if(blogsToFeature.includes(file)){
        //   featuredBlogs.push({
        //     file: file,
        //     path: pathStr,
        //     ...pageProps
        //   })
        // }

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

console.log(pages,'next.config.js');



const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  publicRuntimeConfig: {
    pages: pages,
    blogs: blogs,
    products: products,
    featuredBlogs: featuredBlogs
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.unsplash.com'
      },
    ],
  },
})
