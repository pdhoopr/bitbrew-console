const stripAnsi = require('strip-ansi');

module.exports = {
  test(value) {
    return typeof value === 'string' && value.startsWith('Diff:\n');
  },
  print(value) {
    return stripAnsi(value);
  },
};
