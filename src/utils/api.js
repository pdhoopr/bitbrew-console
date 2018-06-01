import axios from 'axios';
import urls from './urls';

function newAxios({ token } = {}) {
  const baseURL = '/api';
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axios.create({ baseURL, headers });
}

const http = {
  instance: newAxios(),
  async request(config) {
    const response = await this.instance.request(config);
    return response.data;
  },
  get(url) {
    const method = 'get';
    return this.request({ method, url });
  },
  post(url, data) {
    const method = 'post';
    return this.request({ method, url, data });
  },
};

export default {
  configure(config) {
    http.instance = newAxios(config);
  },
  orgs: {
    create(data) {
      return http.post(urls.orgs, data);
    },
    list() {
      return http.get(urls.orgs);
    },
  },
  projects: {
    list(orgId) {
      return http.get(`${urls.projects}?orgId=${orgId}`);
    },
  },
};
