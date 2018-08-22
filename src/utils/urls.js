export const rootPath = '/';

export const selfDetailsPath = '/user';

export const orgsPath = '/orgs';

export function orgDetailsPath(orgId = ':orgId') {
  return `${orgsPath}/${orgId}`;
}

export const projectsPath = '/projects';

export function projectDetailsPath(projectId = ':projectId') {
  return `${projectsPath}/${projectId}`;
}

export const devicesPath = '/devices';
