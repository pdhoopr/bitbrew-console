import { autorun } from 'mobx';
import { getEnv, getRoot, types } from 'mobx-state-tree';

export default types
  .model('AuthStore', {
    storageKey: types.optional(types.string, 'bitbrew-console'),
    token: types.maybeNull(types.string),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api;
    },
    get rootStore() {
      return getRoot(self);
    },
    get isSignedIn() {
      return !!self.token;
    },
  }))
  .actions(self => ({
    afterCreate() {
      self.token = localStorage.getItem(self.storageKey);
    },
    signIn({ accessToken }) {
      localStorage.setItem(self.storageKey, accessToken);
      self.token = accessToken;
    },
    signOut() {
      localStorage.removeItem(self.storageKey);
      self.rootStore.clearAllData();
    },
    configureApi: autorun(() => {
      self.api.configureHttp({
        token: self.token,
      });
    }),
  }));
