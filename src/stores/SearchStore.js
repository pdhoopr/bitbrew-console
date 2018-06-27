import { types } from 'mobx-state-tree';

export default types
  .model('SearchStore', {
    query: types.optional(types.string, ''),
  })
  .views(self => ({
    get isEmpty() {
      return self.query.trim() === '';
    },
  }))
  .actions(self => ({
    setQuery(event) {
      self.query = event.currentTarget.value;
    },
  }));
