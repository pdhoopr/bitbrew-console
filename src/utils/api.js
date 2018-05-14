import axios from 'axios';

const createApi = authHeaders =>
  axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
    },
  });

let api = createApi();

export default {
  configure({ token }) {
    const authHeaders = token && { Authorization: `Bearer ${token}` };
    api = createApi(authHeaders);
  },
  orgs: {
    async list() {
      const { data } = await api.get('/orgs');
      return data;
    },
  },
};
