import { navigate } from '@reach/router';

export const rootPath = '/';
export const createPath = '/new';
export const idPath = '/:id';
export const deletePath = '/delete';
export const orgsPath = '/orgs';
export const createOrgPath = '/orgs/new';
export const orgWithIdPath = id => `/orgs/${id}`;
export const deleteOrgPath = id => `/orgs/${id}/delete`;
export const projectsPath = '/projects';

export function goToOrgs() {
  navigate(orgsPath);
}

export function goToCreateOrg() {
  navigate(createOrgPath);
}

export function goToOrgWithId(id) {
  navigate(orgWithIdPath(id));
}

export function goToDeleteOrg(id) {
  navigate(deleteOrgPath(id));
}
