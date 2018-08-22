import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import { orgDetailsPath } from '../utils/urls';
import Nav from './Nav';

function OrgNav({ orgs }) {
  return (
    <Nav
      heading="Organizations"
      links={orgs.map(org => ({
        text: org.name,
        to: orgDetailsPath(org.id),
      }))}
    />
  );
}

OrgNav.propTypes = {
  orgs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default observer(OrgNav);
