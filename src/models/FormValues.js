import { getSnapshot, types } from 'mobx-state-tree';

export default types
  .model('FormValues')
  .views(self => ({
    get serialized() {
      return getSnapshot(self);
    },
  }))
  .actions(self => ({
    change(event) {
      const { id, value } = event.currentTarget;
      self[id] = value;
    },
  }));
