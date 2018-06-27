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
  async delete(url) {
    const response = await this.request.delete(url);
    return response.data;
  },
};

export function configureHttp(config) {
  http.request = newAxios(config);
}

export function listOrgs() {
  return http.get(urls.orgsPath);
}

export function createOrg(data) {
  return http.post(urls.orgsPath, data);
}

export function viewOrg(id) {
  return http.get(urls.orgWithIdPath(id));
}

export function deleteOrg(id) {
  return http.delete(urls.orgWithIdPath(id));
}

export function listProjects(orgId) {
  return http.get(urls.projectsPath, { orgId });
}
