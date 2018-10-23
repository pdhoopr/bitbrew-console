import { flow, getEnv, types } from 'mobx-state-tree';
import { loginUrl, logoutUrl, serviceUrl } from '../../../config/env';
import UserState from './UserState';

export default types
  .model('UserStore', {
    token: types.maybeNull(types.string),
    user: types.maybeNull(UserState),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api;
    },
  }))
  .actions(self => ({
    setToken(token) {
      self.api.setToken({
        accessToken: token,
        refreshToken: self.refreshToken,
      });
      self.token = token;
    },
    removeToken() {
      self.api.removeToken();
      self.token = null;
    },
    signIn: flow(function* signIn(token) {
      const response = yield self.api.user.view(token);
      self.setToken(token);
      self.user = response;
    }),
    signOut({ redirectUrl = window.location.origin } = {}) {
      self.removeToken();
      self.user = null;
      window.location.assign(
        `${logoutUrl}?redirect_uri=${loginUrl}?redirect_uri=${redirectUrl}`,
      );
    },
    createToken: flow(function* createToken() {
      const params = new URLSearchParams(window.location.search);
      const accessTokenParam = 'access_token';
      const token = params.get(accessTokenParam);
      if (params.has(accessTokenParam)) {
        params.delete(accessTokenParam);
        const url = `${window.location.origin}${window.location.pathname}`;
        const query = `?${params}`.replace(/\?$/, '');
        window.history.replaceState(null, null, `${url}${query}`);
      }
      if (document.referrer.startsWith(serviceUrl) && token) {
        try {
          yield self.signIn(token);
        } catch {
          yield self.refreshToken();
        }
      } else {
        yield self.refreshToken();
      }
    }),
    refreshToken: flow(function* refreshToken() {
      try {
        const token = yield self.api.user.token.refresh();
        yield self.signIn(token);
      } catch {
        self.signOut({
          redirectUrl: window.location.href,
        });
      }
    }),
  }));
