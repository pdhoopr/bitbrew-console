import axios from 'axios';
import urls from './urls';

function createApi(authHeaders) {
  return axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
    },
  });
}

let api = createApi();

export default {
  configure({ token }) {
    const authHeaders = token && { Authorization: `Bearer ${token}` };
    api = createApi(authHeaders);
  },
  orgs: {
    async create(data) {
      const response = await api.post(urls.orgs, data);
      return response.data;
    },
    async list() {
      const response = await api.get(urls.orgs);
      return response.data;
    },
  },
};
