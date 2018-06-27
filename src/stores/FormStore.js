import { getSnapshot, types } from 'mobx-state-tree';

export default types
  .model('FormStore')
  .views(self => ({
    get serialized() {
      return getSnapshot(self);
    },
  }))
  .actions(self => ({
    setValue(event) {
      const { id, value } = event.currentTarget;
      self[id] = value;
    },
  }));
