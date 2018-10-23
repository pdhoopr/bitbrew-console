import PropTypes from 'prop-types';
import React from 'react';
import { connect } from '../../utils/helpers';
import { orgDetailsPath } from '../../utils/urls';
import Nav from '../ui/Nav';
import NavLink from '../ui/NavLink';

function WithOrgNav({ children, orgsAtoZ }) {
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

WithOrgNav.propTypes = {
  children: PropTypes.element.isRequired,
  orgsAtoZ: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default connect(
  WithOrgNav,
  ({ orgStore }) => ({
    orgsAtoZ: orgStore.orgsAtoZ,
  }),
);
