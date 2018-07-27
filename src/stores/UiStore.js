import { types } from 'mobx-state-tree';

export default types
  .model('UiStore', {
    isOpen: types.optional(types.boolean, false),
  })
  .volatile(() => ({
    metadata: {},
  }))
  .views(self => ({
    get isClosed() {
      return !self.isOpen;
    },
  }))
  .actions(self => ({
    open(metadata = {}) {
      self.metadata = metadata;
      self.isOpen = true;
    },
    close() {
      self.isOpen = false;
      self.metadata = {};
    },
  }));
