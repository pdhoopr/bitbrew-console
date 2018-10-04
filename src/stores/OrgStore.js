import jwtDecode from 'jwt-decode';
import { flow, getEnv, getRoot, types } from 'mobx-state-tree';
import { matchesDate, matchesUuid, wait } from '../utils/tools';

export const MemberImpl = types.model('MemberImpl', {
  id: types.refinement(types.identifier, matchesUuid),
  name: types.string,
  email: types.string,
  role: types.string,
});

export const OrgImpl = types
  .model('OrgImpl', {
    id: types.refinement(types.identifier, matchesUuid),
    name: types.string,
    createdAt: types.refinement(types.string, matchesDate),
    memberMap: types.optional(types.map(MemberImpl), {}),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api;
    },
    get members() {
      return [...self.memberMap.values()].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    },
    get projectStore() {
      return getRoot(self).projectStore;
    },
    get projects() {
      return self.projectStore.projects.filter(project => project.org === self);
    },
    getProjectsWithName(name) {
      return self.projects.filter(project =>
        new RegExp(name, 'i').test(project.name),
      );
    },
  }))
  .actions(self => ({
    removeReferences() {
      self.projects.forEach(self.projectStore.removeProject);
    },
    setMember(member) {
      self.memberMap.set(member.id, member);
    },
    removeMember(member) {
      self.memberMap.delete(member.id);
    },
    listMembers: flow(function* listMembers() {
      const response = yield self.api.listMembers(self.id);
      response.items.forEach(self.setMember);
    }),
  }));

export default types
  .model('OrgStore', {
    isLoading: types.optional(types.boolean, false),
    orgMap: types.optional(types.map(OrgImpl), {}),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api;
    },
    get authStore() {
      return getRoot(self).authStore;
    },
    get orgsInToken() {
      return self.authStore.token
        ? Object.keys(jwtDecode(self.authStore.token).orgs)
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
      const response = yield self.api.listOrgs();
      response.items.forEach(self.setOrg);
    }),
    createOrg: flow(function* createOrg(data) {
      const response = yield self.api.createOrg(data);
      self.setOrg(response);
      return self.getOrgWithId(response.id);
    }),
    updateOrg: flow(function* updateOrg(org, data) {
      const response = yield self.api.updateOrg(org.id, data);
      self.setOrg(response);
    }),
    deleteOrg: flow(function* deleteOrg(org) {
      yield self.api.deleteOrg(org.id);
      self.removeOrg(org);
    }),
    refreshTokenUntilHasOrg: flow(function* refreshTokenUntilHasOrg(org) {
      self.setLoading(true);
      yield wait(1000);
      try {
        const token = yield self.api.refreshToken();
        if (jwtDecode(token).orgs[org.id]) {
          yield self.authStore.signIn(token);
          org.listMembers();
        } else {
          yield self.refreshTokenUntilHasOrg(org);
        }
      } catch {
        self.authStore.signOut({
          redirectUrl: window.location.href,
        });
      } finally {
        self.setLoading(false);
      }
    }),
  }));
