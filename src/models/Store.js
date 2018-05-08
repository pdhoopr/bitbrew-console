import { types } from 'mobx-state-tree';

export default types
  .model('Store', {
    storageKey: types.optional(types.string, 'bitbrew-console'),
    token: types.maybe(types.string),
  })
  .views((self) => ({
    get isSignedIn() {
      return !!self.token;
    },
  }))
  .actions((self) => ({
    afterCreate() {
      self.token = localStorage.getItem(self.storageKey);
    },
    signIn({ accessToken }) {
      self.token = accessToken;
      localStorage.setItem(self.storageKey, accessToken);
    },
    signOut() {
      self.token = null;
      localStorage.removeItem(self.storageKey);
    },
  }));
