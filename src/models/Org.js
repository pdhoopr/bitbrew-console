import { types } from 'mobx-state-tree';
import { matchesDate, matchesUuid } from '../utils/tools';

export default types.model('Org', {
  id: types.identifier(types.refinement(types.string, matchesUuid)),
  name: types.string,
  createdAt: types.refinement(types.string, matchesDate),
});
