const baseUrls = {
  orgs: '/orgs',
  projects: '/projects',
};

const subUrls = {
  newOrg: `${baseUrls.orgs}/new`,
};

export default { ...baseUrls, ...subUrls };
