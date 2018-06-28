const fs = require('fs');
const path = require('path');
const paths = require('./paths');

fs.writeFileSync(
  path.resolve(paths.distFolder, '_redirects'),
  [
    '/api/* https://service.bitbrew.com/v2/:splat 200',
    '/* /index.html 200',
  ].join('\n'),
);
