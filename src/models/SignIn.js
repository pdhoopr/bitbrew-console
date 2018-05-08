import { getEnv, getSnapshot, types } from 'mobx-state-tree';

export default types
  .model('SignIn', {
    accessToken: types.optional(types.string, ''),
  })
  .actions((self) => ({
    update(event) {
      const { id, value } = event.currentTarget;
      self[id] = value;
    },
    submit(event) {
      event.preventDefault();
      getEnv(self).onSubmit(getSnapshot(self));
    },
  }));
