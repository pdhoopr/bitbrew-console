import { navigate } from '@reach/router';

export const basePath = '/';
export const newPath = '/new';
export const orgsPath = '/orgs';
export const newOrgPath = '/orgs/new';
export const projectsPath = '/projects';

export function goToOrgs() {
  navigate(orgsPath);
}
