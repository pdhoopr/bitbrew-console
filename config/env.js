const baseUrl = 'https://service.bitbrew.com';
const authUrl = `${baseUrl}/auth`;

module.exports = {
  API_URL: `${baseUrl}/v2`,
  LOGIN_URL: `${authUrl}/login`,
  LOGOUT_URL: `${authUrl}/logout`,
  REFRESH_URL: `${authUrl}/refresh`,
};
