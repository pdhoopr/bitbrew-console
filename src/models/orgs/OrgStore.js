import jwtDecode from 'jwt-decode';
import { flow, getEnv, getRoot, types } from 'mobx-state-tree';
import { wait } from '../../utils/helpers';
import OrgState from './OrgState';

export default types
  .model('OrgStore', {
    isLoading: types.optional(types.boolean, false),
    orgMap: types.optional(types.map(OrgState), {}),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api;
    },
    get userStore() {
      return getRoot(self).userStore;
    },
    get orgsInToken() {
      return self.userStore.token
        ? Object.keys(jwtDecode(self.userStore.token).orgs)
            .filter(orgId => self.orgMap.has(orgId))
            .map(orgId => self.orgMap.get(orgId))
        : [];
    },
    get orgs() {
      return [...self.orgsInToken].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      );
    },
    get orgsAtoZ() {
      return [...self.orgsInToken].sort((a, b) => a.name.localeCompare(b.name));
    },
    getOrgWithId(orgId) {
      return self.orgMap.get(orgId) || null;
    },
  }))
  .actions(self => ({
    setLoading(isLoading) {
      self.isLoading = isLoading;
    },
    setOrg(org) {
      self.orgMap.set(org.id, org);
    },
    removeOrg(org) {
      org.removeReferences();
      self.orgMap.delete(org.id);
    },
    listOrgs: flow(function* listOrgs() {
      const response = yield self.api.orgs.list();
      response.items.forEach(self.setOrg);
    }),
    createOrg: flow(function* createOrg(data) {
      const response = yield self.api.orgs.create(data);
      self.setOrg(response);
      return self.getOrgWithId(response.id);
    }),
    updateOrg: flow(function* updateOrg(org, data) {
      const response = yield self.api.orgs.update(org.id, data);
      self.setOrg({
        ...response,
        memberMap: self.getOrgWithId(org.id).memberMap,
      });
    }),
    deleteOrg: flow(function* deleteOrg(org) {
      yield self.api.orgs.delete(org.id);
      self.removeOrg(org);
    }),
    refreshTokenUntilHasOrg: flow(function* refreshTokenUntilHasOrg(org) {
      self.setLoading(true);
      yield wait(1000);
      try {
        const token = yield self.api.user.token.refresh();
        if (jwtDecode(token).orgs[org.id]) {
          yield self.userStore.signIn(token);
          org.listMembers();
        } else {
          yield self.refreshTokenUntilHasOrg(org);
        }
      } catch {
        self.userStore.signOut({
          redirectUrl: window.location.href,
        });
      } finally {
        self.setLoading(false);
      }
    }),
  }));
