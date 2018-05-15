const { diffSerializer } = require('bitbrew-test-helpers');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const enzymeSerializer = require('enzyme-to-json/serializer');
require('jest-styled-components');

Enzyme.configure({
  adapter: new Adapter(),
});

expect.addSnapshotSerializer(enzymeSerializer);
expect.addSnapshotSerializer(diffSerializer);
