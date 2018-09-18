const fs = require('fs');
const path = require('path');
const { apiUrl } = require('./env');
const paths = require('./paths');

fs.writeFileSync(
  path.resolve(paths.distFolder, '_redirects'),
  [`/api/* ${apiUrl}/:splat 200`, '/* /index.html 200'].join('\n'),
);
