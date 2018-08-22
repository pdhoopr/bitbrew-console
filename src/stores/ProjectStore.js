import { flow, getEnv, types } from 'mobx-state-tree';
import { matchesDate, matchesUuid } from '../utils/tools';
import { OrgImpl } from './OrgStore';

export const ProjectImpl = types.model('ProjectImpl', {
  id: types.refinement(types.identifier, matchesUuid),
  org: types.reference(OrgImpl),
  name: types.string,
  description: types.string,
  usesSimulatedDevices: types.boolean,
  createdAt: types.refinement(types.string, matchesDate),
});

export default types
  .model('ProjectStore', {
    projectMap: types.optional(types.map(ProjectImpl), {}),
  })
  .views(self => ({
    get api() {
      return getEnv(self).api;
    },
    get projects() {
      return [...self.projectMap.values()].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt),
      );
    },
  }))
  .actions(self => ({
    setProject({ orgId, ...project }) {
      self.projectMap.set(project.id, {
        ...project,
        org: orgId,
      });
    },
    removeProject(project) {
      self.projectMap.delete(project.id);
    },
    listProjects: flow(function* listProjects(org) {
      const response = yield self.api.listProjects(org.id);
      response.items.forEach(self.setProject);
    }),
    createProject: flow(function* createProject(data) {
      const response = yield self.api.createProject(data);
      self.setProject(response);
    }),
    updateProject: flow(function* updateProject(project, data) {
      const response = yield self.api.updateProject(project.id, data);
      self.setProject(response);
    }),
    deleteProject: flow(function* deleteProject(project) {
      yield self.api.deleteProject(project.id);
      self.removeProject(project);
    }),
  }));
