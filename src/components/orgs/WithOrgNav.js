import PropTypes from "prop-types";
import React from "react";
import Nav from "../ui/Nav";
import NavLink from "../ui/NavLink";

export default function WithOrgNav({ children, orgId }) {
  const orgUrl = `/orgs/${orgId}`;
  return (
    <React.Fragment>
      <Nav heading="Organization Resources">
        <NavLink to={orgUrl} exact>
          Overview
        </NavLink>
        <NavLink to={`${orgUrl}/members`} exact>
          Members
        </NavLink>
        <NavLink to={`${orgUrl}/projects`} exact>
          Projects
        </NavLink>
      </Nav>
      {children}
    </React.Fragment>
  );
}

WithOrgNav.propTypes = {
  children: PropTypes.node.isRequired,
  orgId: PropTypes.string,
};

WithOrgNav.defaultProps = {
  orgId: null,
};
