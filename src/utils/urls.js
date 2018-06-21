import { navigate } from '@reach/router';

export const listPath = '/';
export const createPath = '/new';
export const viewPath = '/:id';
export const deletePath = '/delete';
export const listOrgsPath = '/orgs';
export const createOrgPath = '/orgs/new';
export const viewOrgPath = id => `/orgs/${id}`;
export const deleteOrgPath = id => `/orgs/${id}/delete`;
export const listProjectsPath = '/projects';

export function goToListOrgs() {
  navigate(listOrgsPath);
}

export function goToCreateOrg() {
  navigate(createOrgPath);
}

export function goToViewOrg(id) {
  navigate(viewOrgPath(id));
}

export function goToDeleteOrg(id) {
  navigate(deleteOrgPath(id));
}
