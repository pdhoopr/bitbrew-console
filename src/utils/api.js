import axios from 'axios';
import * as urls from './urls';

function newAxios({ token } = {}) {
  const baseURL = '/api';
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axios.create({ baseURL, headers });
}

const http = {
  request: newAxios(),
  async get(url, queryParams) {
    const response = await this.request.get(url, {
      params: {
        pageSize: 500,
        ...queryParams,
      },
    });
    return response.data;
  },
  async post(url, data) {
    const response = await this.request.post(url, data);
    return response.data;
  },
  async put(url, data) {
    const response = await this.request.put(url, data);
    return response.data;
  },
  async delete(url) {
    const response = await this.request.delete(url);
    return response.data;
  },
};

export function configureHttp(config) {
  http.request = newAxios(config);
}

export function viewSelf() {
  return http.get(urls.selfDetailsPath);
}

export function listOrgs() {
  return http.get(urls.orgsPath);
}

export function createOrg(data) {
  return http.post(urls.orgsPath, data);
}

export function updateOrg(orgId, data) {
  return http.put(urls.orgDetailsPath(orgId), data);
}

export function deleteOrg(orgId) {
  return http.delete(urls.orgDetailsPath(orgId));
}

export function listProjects(orgId) {
  return http.get(urls.projectsPath, { orgId });
}

export function createProject(data) {
  return http.post(urls.projectsPath, data);
}

export function updateProject(projectId, data) {
  return http.put(urls.projectDetailsPath(projectId), data);
}

export function deleteProject(projectId) {
  return http.delete(urls.projectDetailsPath(projectId));
}
