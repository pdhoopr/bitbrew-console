const serviceUrl = 'https://service.bitbrew.com';
const apiUrl = `${serviceUrl}/v2`;
const authUrl = `${serviceUrl}/auth`;
const loginUrl = `${authUrl}/login`;
const logoutUrl = `${authUrl}/logout`;
const refreshUrl = `${authUrl}/refresh`;

module.exports = {
  serviceUrl,
  apiUrl,
  authUrl,
  loginUrl,
  logoutUrl,
  refreshUrl,
};
