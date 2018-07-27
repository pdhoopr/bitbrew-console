import { flow, getEnv, types } from 'mobx-state-tree';
import { matchesDate, matchesUuid } from '../utils/tools';
import { OrgImpl } from './OrgStore';

export const ProjectImpl = types.model('ProjectImpl', {
  id: types.refinement(types.identifier, matchesUuid),
  name: types.string,
  description: types.string,
  createdAt: types.refinement(types.string, matchesDate),
  org: types.reference(OrgImpl),
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
    replaceProjects(projects) {
      projects.forEach(self.setProject);
    },
    clearProjects(projects) {
      projects.forEach(self.removeProject);
    },
    createProject: flow(function* createProject(data) {
      const response = yield self.api.createProject(data);
      self.setProject(response);
    }),
  }));
