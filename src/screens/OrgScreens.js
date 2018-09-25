import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from '../components/Links';
import Nav from '../components/Nav';
import { connect } from '../utils/tools';
import { orgDetailsPath } from '../utils/urls';

function OrgScreens({ children, orgsAtoZ }) {
  return (
    <React.Fragment>
      <Nav heading="Organizations">
        {orgsAtoZ.map(org => (
          <NavLink key={org.id} to={orgDetailsPath(org.id)}>
            {org.name}
          </NavLink>
        ))}
      </Nav>
      {children}
    </React.Fragment>
  );
}

OrgScreens.propTypes = {
  children: PropTypes.element.isRequired,
  orgsAtoZ: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default connect(
  OrgScreens,
  ({ orgStore }) => ({
    orgsAtoZ: orgStore.orgsAtoZ,
  }),
);
