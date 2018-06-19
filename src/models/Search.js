import { types } from 'mobx-state-tree';

export default types
  .model('Search', {
    query: types.optional(types.string, ''),
  })
  .views(self => ({
    get isEmpty() {
      return self.query.trim() === '';
    },
    matchesQuery(value) {
      return new RegExp(self.query, 'i').test(value);
    },
  }))
  .actions(self => ({
    change(event) {
      self.query = event.currentTarget.value;
    },
  }));
