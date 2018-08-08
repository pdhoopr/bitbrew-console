export const rootPath = '/';

export const orgsPath = '/orgs';

export function orgDetailsPath(orgId = ':orgId') {
  return `${orgsPath}/${orgId}`;
}

export const projectsPath = '/projects';

export function projectDetailsPath(projectId = ':projectId') {
  return `${projectsPath}/${projectId}`;
}

export const selfDetailsPath = '/user';
