export const rootPath = '/';

export const userDetailsPath = '/user';

export const orgsPath = '/orgs';

export function orgDetailsPath(orgId = ':orgId') {
  return `${orgsPath}/${orgId}`;
}

export const membersPath = '/members';

export function orgMembersPath(orgId) {
  return `${orgDetailsPath(orgId)}${membersPath}`;
}

export const projectsPath = '/projects';

export function projectDetailsPath(projectId = ':projectId') {
  return `${projectsPath}/${projectId}`;
}

export const devicesPath = '/devices';

export function projectDevicesPath(projectId) {
  return `${projectDetailsPath(projectId)}${devicesPath}`;
}

export function deviceDetailsPath(deviceId = ':deviceId') {
  return `${devicesPath}/${deviceId}`;
}

export function projectDeviceDetailsPath(projectId, deviceId) {
  return `${projectDetailsPath(projectId)}${deviceDetailsPath(deviceId)}`;
}
