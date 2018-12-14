const path = require("path");

const rootFolder = path.resolve(__dirname, "..");
const envFile = path.resolve(rootFolder, "config/env.js");
const distFolder = path.resolve(rootFolder, "dist");
const distCssFolder = path.resolve(distFolder, "css");
const srcFolder = path.resolve(rootFolder, "src");
const staticFolder = path.resolve(rootFolder, "static");
const htmlFile = path.resolve(staticFolder, "index.html");
const webLoginCssFile = path.resolve(staticFolder, "css/web-login.css");

module.exports = {
  rootFolder,
  envFile,
  distFolder,
  distCssFolder,
  srcFolder,
  staticFolder,
  htmlFile,
  webLoginCssFile,
};
