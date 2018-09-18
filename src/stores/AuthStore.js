import { navigate } from '@reach/router';
import { flow, getEnv, types } from 'mobx-state-tree';
import { loginUrl, logoutUrl, serviceUrl } from '../../config/env';

export default types
  .model('AuthStore', {
    token: types.maybeNull(types.string),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api;
    },
  }))
  .actions(self => ({
    setToken(token) {
      self.api.init({
        token,
        refreshToken: self.refreshToken,
      });
      self.token = token;
    },
    removeToken() {
      self.api.reset();
      self.token = null;
    },
    signIn: flow(function* signIn(token) {
      yield self.api.viewSelf(token);
      self.setToken(token);
    }),
    signOut({ redirectUrl = window.location.origin } = {}) {
      self.removeToken();
      navigate(
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
        navigate(`${url}${query}`, {
          replace: true,
        });
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
        const token = yield self.api.refreshToken();
        yield self.signIn(token);
      } catch {
        self.signOut({
          redirectUrl: window.location.href,
        });
      }
    }),
  }));
