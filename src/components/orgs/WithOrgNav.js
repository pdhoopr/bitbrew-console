import PropTypes from "prop-types";
import React, { useState } from "react";
import { viewOrg } from "../../api";
import useLoading from "../hooks/useLoading";
import Nav from "../ui/Nav";
import NavLink from "../ui/NavLink";
import OrgContext from "./OrgContext";

export default function WithOrgNav({ children, orgId }) {
  const [org, setOrg] = useState({});

  async function loadOrg() {
    const data = await viewOrg(orgId);
    setOrg(data);
  }

  const isLoading = useLoading(loadOrg, [orgId]);

  const orgUrl = `/orgs/${orgId}`;
  return (
    <React.Fragment>
      <Nav isLoading={isLoading} heading={org.name}>
        <NavLink to={orgUrl} exact>
          Organization Info
        </NavLink>
        <NavLink to={`${orgUrl}/projects`} exact>
          Projects
        </NavLink>
      </Nav>
      <OrgContext.Provider
        value={{
          org,
          loadOrg,
          orgIsLoading: isLoading,
        }}
      >
        {children}
      </OrgContext.Provider>
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
