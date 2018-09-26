import axios from 'axios';
import { refreshUrl } from '../../config/env';
import {
  devicesPath,
  orgDetailsPath,
  orgsPath,
  projectDetailsPath,
  projectsPath,
  selfDetailsPath,
} from './urls';

function createClient(config) {
  return axios.create({
    baseURL: '/api',
    ...config,
  });
}

let client = createClient();

const http = {
  async get(url, config) {
    const response = await client.get(url, config);
    return response.data;
  },
  async post(url, data) {
    const response = await client.post(url, data);
    return response.data;
  },
  async put(url, data) {
    const response = await client.put(url, data);
    return response.data;
  },
  async delete(url) {
    const response = await client.delete(url);
    return response.data;
  },
};

export function init(options) {
  client = createClient({
    headers: {
      Authorization: `Bearer ${options.token}`,
    },
  });
  client.interceptors.response.use(
    response => response,
    async error => {
      if (error.response.status === 401) {
        await options.refreshToken();
        const response = await client.request({
          ...error.config,
          baseURL: null,
        });
        return response;
      }
      throw error;
    },
  );
}

export function reset() {
  client = createClient();
}

export function refreshToken() {
  return new Promise((resolve, reject) => {
    const redirectUrl = `${window.location.origin}/refresh-token.html`;
    const iframe = document.createElement('iframe');
    iframe.hidden = true;
    iframe.title = 'Refreshing token...';
    iframe.src = `${refreshUrl}?redirect_uri=${redirectUrl}`;
    iframe.onmessage = event => {
      if (
        event.origin === window.location.origin &&
        event.data === 'REFRESH_TOKEN'
      ) {
        const params = new URLSearchParams(event.source.location.search);
        const token = params.get('access_token');
        window.removeEventListener('message', iframe.onmessage);
        document.body.removeChild(iframe);
        resolve(token);
      }
    };
    iframe.onload = event => {
      try {
        // eslint-disable-next-line no-unused-expressions
        event.currentTarget.contentWindow.href;
      } catch {
        window.removeEventListener('message', iframe.onmessage);
        document.body.removeChild(iframe);
        reject();
      }
    };
    window.addEventListener('message', iframe.onmessage);
    document.body.appendChild(iframe);
  });
}

export function viewSelf(token) {
  return http.get(selfDetailsPath, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function listOrgs() {
  return http.get(orgsPath, {
    params: {
      pageSize: 500,
    },
  });
}

export function createOrg(data) {
  return http.post(orgsPath, data);
}

export function updateOrg(orgId, data) {
  return http.put(orgDetailsPath(orgId), data);
}

export function deleteOrg(orgId) {
  return http.delete(orgDetailsPath(orgId));
}

export function listProjects(orgId) {
  return http.get(projectsPath, {
    params: {
      orgId,
      pageSize: 500,
    },
  });
}

export function createProject(data) {
  return http.post(projectsPath, data);
}

export function updateProject(projectId, data) {
  return http.put(projectDetailsPath(projectId), data);
}

export function deleteProject(projectId) {
  return http.delete(projectDetailsPath(projectId));
}

export function listDevices(projectId) {
  return http.get(devicesPath, {
    params: {
      projectId,
      pageSize: 500,
    },
  });
}

export function createDevice(data) {
  return http.post(devicesPath, data);
}
