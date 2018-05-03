const path = require('path');

function getPathTo(to = '', from = `${__dirname}/..`) {
  return path.resolve(from, to);
}

const folders = {
  root: getPathTo(),
  dist: getPathTo('dist'),
  src: getPathTo('src'),
  static: getPathTo('static'),
};

const files = {
  indexHtml: getPathTo('index.html', folders.static),
};

module.exports = { folders, files };
