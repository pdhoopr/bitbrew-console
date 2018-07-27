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
    listProjects: flow(function* listProjects() {
      const response = yield self.api.listProjects(self.id);
      self.projectStore.clearProjects(self.projects);
      self.projectStore.replaceProjects(response.items);
    }),
  }));

export default types
  .model('OrgStore', {
    orgMap: types.optional(types.map(OrgImpl), {}),
    shouldLoadOrgs: types.optional(types.boolean, true),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api;
    },
    get projectStore() {
      return getRoot(self).projectStore;
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
      self.orgMap.delete(org.id);
    },
    replaceOrgs(orgs) {
      orgs.forEach(self.setOrg);
    },
    clearOrgs() {
      self.orgMap.clear();
    },
    listOrgs: flow(function* listOrgs() {
      if (self.shouldLoadOrgs) {
        const response = yield self.api.listOrgs();
        self.clearOrgs();
        self.replaceOrgs(response.items);
        self.orgs.forEach(org => {
          org.listProjects();
        });
        self.shouldLoadOrgs = false;
      }
    }),
    createOrg: flow(function* createOrg(data) {
      yield self.api.createOrg(data);
    }),
    viewOrg: flow(function* viewOrg(orgId) {
      yield self.listOrgs();
      if (!self.getOrgWithId(orgId)) {
        const [orgResponse, projectsResponse] = yield Promise.all([
          self.api.viewOrg(orgId),
          self.api.listProjects(orgId),
        ]);
        self.setOrg(orgResponse);
        self.projectStore.replaceProjects(projectsResponse.items);
      }
    }),
    deleteOrg: flow(function* deleteOrg(org) {
      yield self.api.deleteOrg(org.id);
      self.projectStore.clearProjects(org.projects);
      self.removeOrg(org);
    }),
  }));
