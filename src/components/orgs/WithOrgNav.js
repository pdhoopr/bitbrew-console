import PropTypes from "prop-types";
import React from "react";
import Nav from "../ui/Nav";
import NavLink from "../ui/NavLink";

export default function WithOrgNav({ children, orgId }) {
  return (
    <React.Fragment>
      <Nav heading="Organization Resources">
        <NavLink to={`/orgs/${orgId}`} exact>
          Overview
        </NavLink>
        <NavLink to={`/orgs/${orgId}/members`} exact>
          Members
        </NavLink>
        <NavLink to={`/orgs/${orgId}/projects`} exact>
          Projects
        </NavLink>
      </Nav>
      {children}
    </React.Fragment>
  );
}

WithOrgNav.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  orgId: PropTypes.string,
};

WithOrgNav.defaultProps = {
  orgId: null,
};
