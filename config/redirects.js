const fs = require('fs');
const path = require('path');
const env = require('./env');
const paths = require('./paths');

const redirects = [
  `/api/* ${env.production.HOST}/v2/:splat 200`,
  '/* /index.html 200',
];

fs.writeFileSync(
  path.resolve(paths.distFolder, '_redirects'),
  redirects.join('\n'),
);
