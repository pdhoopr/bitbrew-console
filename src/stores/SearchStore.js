import { types } from 'mobx-state-tree';

export default types
  .model('SearchStore', {
    term: types.optional(types.string, ''),
  })
  .views(self => ({
    get isEmpty() {
      return self.term.trim() === '';
    },
  }))
  .actions(self => ({
    setTerm(event) {
      self.term = event.currentTarget.value;
    },
  }));
