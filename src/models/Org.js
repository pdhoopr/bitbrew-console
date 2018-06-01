import { types } from 'mobx-state-tree';
import matchesUuid from '../utils/matchesUuid';

export default types.model('Org', {
  id: types.identifier(types.refinement(types.string, matchesUuid)),
  name: types.string,
});
