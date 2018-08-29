import { navigate } from '@reach/router';
import jwtDecode from 'jwt-decode';
import { flow, getEnv, types } from 'mobx-state-tree';
import { REFRESH_URL } from '../../config/env';
import { wait } from '../utils/tools';

export default types
  .model('AuthStore', {
    paramName: types.optional(types.string, 'access_token'),
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
      yield self.api.viewSelf(token);
      self.setToken(token);
    }),
    signOut() {
      self.removeToken();
    },
    createToken: flow(function* createToken() {
      const params = new URLSearchParams(window.location.search);
      const token = params.get(self.paramName);
      if (token) {
        params.delete(self.paramName);
        const baseUrl = `${window.location.origin}${window.location.pathname}`;
        const paramString = params.toString();
        const queryString = paramString.length > 0 ? `?${paramString}` : '';
        navigate(`${baseUrl}${queryString}`, {
          replace: true,
        });
        try {
          yield self.signIn(token);
        } catch (error) {
          console.error(error);
        }
      }
      const tokenInStorage = window.localStorage.getItem(self.storageKey);
      if (!self.token && tokenInStorage) {
        try {
          yield self.signIn(tokenInStorage);
        } catch {
          self.removeToken();
        }
      }
    }),
    refreshToken(orgId, onSuccess) {
      const iframe = document.createElement('iframe');
      const referrer = `${window.location.origin}/refresh-token.html`;
      iframe.src = `${REFRESH_URL}?redirect_uri=${referrer}`;
      iframe.title = 'Refreshing token...';
      iframe.hidden = true;
      iframe.onload = event => {
        try {
          // eslint-disable-next-line no-unused-expressions
          event.currentTarget.contentWindow.href;
        } catch {
          self.signOut();
        }
      };
      window.addEventListener('message', async function checkToken(event) {
        await wait(500);
        if (
          event.origin === window.location.origin &&
          event.data === 'REFRESH_TOKEN'
        ) {
          const params = new URLSearchParams(event.source.location.search);
          const token = params.get(self.paramName);
          try {
            if (orgId && !jwtDecode(token).orgs[orgId]) {
              throw new Error();
            }
            await self.signIn(token);
            if (onSuccess) {
              onSuccess();
            }
          } catch {
            self.refreshToken(orgId, onSuccess);
          }
          window.removeEventListener('message', checkToken);
          document.body.removeChild(iframe);
        }
      });
      document.body.appendChild(iframe);
    },
  }));
