import { autorun } from 'mobx';
import { flow, types } from 'mobx-state-tree';
import api from '../utils/api';
import Org from './Org';

export default types
  .model('Store', {
    orgs: types.optional(types.array(Org), []),
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
    configureApi: autorun(() => {
      api.configure({
        token: self.token,
      });
    }),
    listOrgs: flow(function* listOrgs() {
      const { items } = yield api.orgs.list();
      self.orgs = items
        .map((org) => Org.create(org))
        .sort((a, b) =>
          a.properName.toLowerCase().localeCompare(b.properName.toLowerCase()),
        );
    }),
  }));
