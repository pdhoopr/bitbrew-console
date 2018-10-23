import { getSnapshot, types } from 'mobx-state-tree';

export default types
  .model('FormState')
  .views(self => ({
    get serialized() {
      return getSnapshot(self);
    },
  }))
  .actions(self => ({
    setValue(event) {
      const { checked, id, type, value } = event.currentTarget;
      self[id] = type === 'checkbox' ? checked : value;
    },
  }));
