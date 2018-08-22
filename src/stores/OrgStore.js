import { flow, getEnv, getRoot, types } from 'mobx-state-tree';
import { matchesDate, matchesUuid } from '../utils/tools';

export const OrgImpl = types
  .model('OrgImpl', {
    id: types.refinement(types.identifier, matchesUuid),
    name: types.string,
    createdAt: types.refinement(types.string, matchesDate),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api;
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
  }));

export default types
  .model('OrgStore', {
    orgMap: types.optional(types.map(OrgImpl), {}),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api;
    },
    get orgs() {
      return [...self.orgMap.values()].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      );
    },
    get orgsAtoZ() {
      return [...self.orgMap.values()].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    },
    getOrgWithId(orgId) {
      return self.orgMap.get(orgId) || null;
    },
  }))
  .actions(self => ({
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
      yield self.api.createOrg(data);
    }),
    updateOrg: flow(function* updateOrg(org, data) {
      const response = yield self.api.updateOrg(org.id, data);
      self.setOrg(response);
    }),
    deleteOrg: flow(function* deleteOrg(org) {
      yield self.api.deleteOrg(org.id);
      self.removeOrg(org);
    }),
  }));
