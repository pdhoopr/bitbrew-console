const baseUrls = {
  orgs: '/orgs',
};

const subUrls = {
  newOrg: `${baseUrls.orgs}/new`,
};

export default { ...baseUrls, ...subUrls };
