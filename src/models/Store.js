import { autorun } from 'mobx';
import { flow, types } from 'mobx-state-tree';
import * as api from '../utils/api';
import { flatMap } from '../utils/tools';
import Org from './Org';
import Project from './Project';

export default types
  .model('Store', {
    orgs: types.optional(types.array(Org), []),
    projects: types.optional(types.array(Project), []),
    storageKey: types.optional(types.string, 'bitbrew-console'),
    token: types.maybe(types.string),
  })
  .views(self => ({
    get isSignedIn() {
      return !!self.token;
    },
    get newestOrgs() {
      return [...self.orgs].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      );
    },
    get newestProjects() {
      return self.orgs.reduce(
        (hash, org) => ({
          ...hash,
          [org.id]: self.projects
            .filter(project => project.orgId === org)
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
        }),
        {},
      );
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
    createOrg: flow(function* createOrg(data) {
      yield api.postOrg(data);
    }),
    listOrgs: flow(function* listOrgs() {
      const response = yield api.getOrgs();
      self.orgs = response.items;
    }),
    listProjects: flow(function* listProjects() {
      const requests = self.orgs.map(api.getProjects);
      const responses = yield Promise.all(requests);
      self.projects = flatMap(responses, response => response.items);
    }),
  }));
