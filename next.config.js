const fs = require("fs").promises;

fs.readdir(__dirname + "/src/pages/").then(console.log);

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
})


