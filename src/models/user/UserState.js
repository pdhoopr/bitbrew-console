import { types } from 'mobx-state-tree';

export default types.model('UserImpl', {
  email: types.string,
});
