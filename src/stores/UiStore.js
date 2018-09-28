import { types } from 'mobx-state-tree';

export default types
  .model('UiStore', {
    isLoading: types.optional(types.boolean, false),
    isOpen: types.optional(types.boolean, false),
  })
  .views(self => ({
    get isClosed() {
      return !self.isOpen;
    },
  }))
  .actions(self => ({
    setLoading(isLoading) {
      self.isLoading = isLoading;
    },
    open() {
      self.isOpen = true;
    },
    close() {
      self.isOpen = false;
    },
  }));
