import { autorun } from 'mobx';
import { flow, types } from 'mobx-state-tree';
import * as api from '../utils/api';
import { flatMap, mapArrayToObject } from '../utils/tools';
import Org from './Org';
import Project from './Project';

export default types
  .model('Store', {
    orgs: types.optional(types.array(Org), []),
    projects: types.optional(types.array(Project), []),
    storageKey: types.optional(types.string, 'bitbrew-console'),
    token: types.maybe(types.string),
  })
  .volatile(() => ({
    deletedOrgs: {},
  }))
  .views(self => ({
    get isSignedIn() {
      return !!self.token;
    },
    get orgsById() {
      return mapArrayToObject(self.orgs, org => ({
        [org.id]: org,
      }));
    },
    get newestOrgs() {
      return [...self.orgs].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      );
    },
    get newestProjectsByOrg() {
      return mapArrayToObject(self.orgs, org => ({
        [org.id]: self.projects
          .filter(project => project.orgId === org)
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
      }));
    },
  }))
  .actions(self => ({
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
      api.configureHttp({
        token: self.token,
      });
    }),
    listOrgs: flow(function* listOrgs() {
      const response = yield api.listOrgs();
      self.orgs = response.items.filter(org => !self.deletedOrgs[org.id]);
    }),
    createOrg: flow(function* createOrg(data) {
      yield api.createOrg(data);
    }),
    viewOrg: flow(function* viewOrg(id) {
      const [orgResponse, projectsResponse] = yield Promise.all([
        api.viewOrg(id),
        api.listProjects(id),
      ]);
      const orgs = self.orgs.filter(org => org.id !== id);
      self.orgs = [...orgs, orgResponse];
      const projectIds = mapArrayToObject(projectsResponse.items, project => ({
        [project.id]: true,
      }));
      const projects = self.projects.filter(project => !projectIds[project.id]);
      self.projects = [...projects, ...projectsResponse.items];
    }),
    deleteOrg: flow(function* deleteOrg(id) {
      yield api.deleteOrg(id);
      self.deletedOrgs[id] = true;
    }),
    listProjects: flow(function* listProjects() {
      const requests = self.orgs.map(org => api.listProjects(org.id));
      const responses = yield Promise.all(requests);
      self.projects = flatMap(responses, response => response.items);
    }),
  }));
