import { getEnv, types } from 'mobx-state-tree';

export default types
  .model('Search', {
    query: types.optional(types.string, ''),
  })
  .views(self => ({
    get results() {
      return getEnv(self).onSearch(self.query);
    },
  }))
  .actions(self => ({
    update(event) {
      self.query = event.currentTarget.value;
    },
  }));
