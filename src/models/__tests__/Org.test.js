import { fixtures } from 'bitbrew-test-helpers';
import Org from '../Org';

test('initializes an org with the defined values', () => {
  const data = fixtures.orgs.bitbrew;
  const model = Org.create(data);
  expect(model).toMatchObject(data);
});
