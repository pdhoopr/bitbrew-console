import { getEnv, getSnapshot, types } from 'mobx-state-tree';

export default types.model('FormEvents').actions(self => ({
  update(event) {
    const { id, value } = event.currentTarget;
    self[id] = value;
  },
  submit(event) {
    event.preventDefault();
    getEnv(self).onSubmit(getSnapshot(self));
  },
}));
