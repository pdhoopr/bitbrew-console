import { types } from 'mobx-state-tree';
import { matchesDate, matchesUuid } from '../utils/tools';
import Org from './Org';

export default types.model('Project', {
  id: types.identifier(types.refinement(types.string, matchesUuid)),
  orgId: types.reference(Org),
  name: types.string,
  description: types.string,
  createdAt: types.refinement(types.string, matchesDate),
});
