import { getEnv, getSnapshot, types } from 'mobx-state-tree';

export default types
  .model('SignIn', {
    accessToken: types.optional(types.string, ''),
  })
  .actions(self => ({
    update(event) {
      self.accessToken = event.currentTarget.value;
    },
    submit(event) {
      event.preventDefault();
      getEnv(self).onSubmit(getSnapshot(self));
    },
  }));
