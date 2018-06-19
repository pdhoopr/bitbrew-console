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
};

export function configureHttp(config) {
  http.request = newAxios(config);
}

export function listOrgs() {
  return http.get(urls.listOrgsPath);
}

export function createOrg(data) {
  return http.post(urls.listOrgsPath, data);
}

export function viewOrg(id) {
  return http.get(urls.viewOrgPath(id));
}

export function listProjects(orgId) {
  return http.get(urls.listProjectsPath, { orgId });
}
