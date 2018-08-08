import { navigate } from '@reach/router';
import { flow, getEnv, types } from 'mobx-state-tree';
import env from '../../config/env';

export default types
  .model('AuthStore', {
    token: types.maybeNull(types.string),
  })
  .volatile(() => ({
    paramKey: 'access_token',
    storageKey: 'bitbrew-console',
  }))
  .views(self => ({
    get api() {
      return getEnv(self).api;
    },
  }))
  .actions(self => ({
    afterCreate: flow(function* afterCreate() {
      const params = new URLSearchParams(window.location.search);
      const tokenInParams = params.get(self.paramKey);
      const tokenInStorage = window.localStorage.getItem(self.storageKey);
      if (tokenInParams) {
        params.delete(self.paramKey);
        const [url] = window.location.href.split('?');
        const paramString = params.toString();
        const queryString = paramString.length > 0 ? `?${paramString}` : '';
        navigate(`${url}${queryString}`, {
          replace: true,
        });
        yield self.signIn(tokenInParams);
      }
      if (!self.token && tokenInStorage) {
        yield self.signIn(tokenInStorage);
      }
      if (!self.token) {
        self.signOut({
          referrer: window.location.href,
        });
      }
    }),
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
    signOut({ referrer = window.location.origin } = {}) {
      self.removeToken();
      const { HOST } = env[process.env.NODE_ENV];
      navigate(`${HOST}/auth/login?redirect_uri=${referrer}`);
    },
  }));
