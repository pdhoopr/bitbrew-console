const fs = require('fs');
const path = require('path');
const { API_URL } = require('./env');
const paths = require('./paths');

fs.writeFileSync(
  path.resolve(paths.distFolder, '_redirects'),
  [`/api/* ${API_URL}/:splat 200`, '/* /index.html 200'].join('\n'),
);
