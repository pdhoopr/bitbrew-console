import { navigate } from '@reach/router';

export const listPath = '/';
export const createPath = '/new';
export const viewPath = '/:id';
export const listOrgsPath = '/orgs';
export const createOrgPath = '/orgs/new';
export const viewOrgPath = id => `/orgs/${id}`;
export const listProjectsPath = '/projects';

export function goToListOrgs() {
  navigate(listOrgsPath);
}
