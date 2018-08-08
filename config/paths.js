const path = require('path');

const rootFolder = path.resolve(__dirname, '..');
const envFile = path.resolve(rootFolder, 'config/env.js');
const distFolder = path.resolve(rootFolder, 'dist');
const srcFolder = path.resolve(rootFolder, 'src');
const staticFolder = path.resolve(rootFolder, 'static');
const htmlFile = path.resolve(staticFolder, 'index.html');

module.exports = {
  rootFolder,
  envFile,
  distFolder,
  srcFolder,
  staticFolder,
  htmlFile,
};
