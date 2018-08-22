import { flow, getEnv, types } from 'mobx-state-tree';

export default types
  .model('AuthStore', {
    storageKey: types.optional(types.string, 'bitbrew-console:token'),
    token: types.maybeNull(types.string),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api;
    },
  }))
  .actions(self => ({
    setToken(token) {
      window.localStorage.setItem(self.storageKey, token);
      self.api.configureHttp({ token });
      self.token = token;
    },
    removeToken() {
      window.localStorage.removeItem(self.storageKey);
      self.api.configureHttp();
      self.token = null;
    },
    signIn: flow(function* signIn(token) {
      try {
        self.api.configureHttp({ token });
        yield self.api.viewSelf();
        self.setToken(token);
      } catch (error) {
        self.removeToken();
      }
    }),
    signOut() {
      self.removeToken();
    },
    checkToken: flow(function* checkToken(token) {
      const tokenInStorage = window.localStorage.getItem(self.storageKey);
      if (token) {
        yield self.signIn(token);
      }
      if (!self.token && tokenInStorage) {
        yield self.signIn(tokenInStorage);
      }
    }),
  }));
