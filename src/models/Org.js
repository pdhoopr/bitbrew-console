import { types } from 'mobx-state-tree';

export default types.model('Org', {
  id: types.identifier(types.string),
  properName: types.string,
});
