import { types } from 'mobx-state-tree';
import { isUuid } from '../../utils/validators';

export default types.model('MemberState', {
  id: types.refinement(types.identifier, isUuid),
  name: types.string,
  email: types.string,
  role: types.string,
});
