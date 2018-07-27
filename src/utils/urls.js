export const rootPath = '/';
export const orgsPath = '/orgs';
export const orgDetailsPath = (orgId = ':orgId') => `/orgs/${orgId}`;
export const projectsPath = '/projects';
export const projectDetailsPath = (projectId = ':projectId') =>
  `/projects/${projectId}`;
