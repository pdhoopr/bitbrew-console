import PropTypes from "prop-types";
import React from "react";
import Nav from "../ui/Nav";
import NavLink from "../ui/NavLink";

export default function WithProjectNav({ children, orgId, projectId }) {
  return (
    <React.Fragment>
      <Nav heading="Project Resources">
        <NavLink to={`/orgs/${orgId}/projects/${projectId}/devices`}>
          Devices
        </NavLink>
        <NavLink to={`/orgs/${orgId}/projects/${projectId}/destinations`}>
          Destinations
        </NavLink>
      </Nav>
      {children}
    </React.Fragment>
  );
}

WithProjectNav.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  orgId: PropTypes.string,
  projectId: PropTypes.string,
};

WithProjectNav.defaultProps = {
  orgId: null,
  projectId: null,
};
