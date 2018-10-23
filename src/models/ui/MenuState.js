import { types } from 'mobx-state-tree';

export default types
  .model('MenuState', {
    isOpen: types.optional(types.boolean, false),
  })
  .views(self => ({
    get isClosed() {
      return !self.isOpen;
    },
  }))
  .actions(self => ({
    open() {
      self.isOpen = true;
    },
    close() {
      self.isOpen = false;
    },
  }));
