import PropTypes from "prop-types";
import React, { useState } from "react";
import { viewOrg } from "../../api";
import { Nav, NavLink } from "../../design-system";
import Header from "../shared/Header";
import resourceTypes from "../shared/resourceTypes";
import useLoading from "../shared/useLoading";
import OrgContext from "./OrgContext";

export default function WithOrgHeader({ children, orgId }) {
  const [org, setOrg] = useState({});

  async function loadOrg() {
    const data = await viewOrg(orgId);
    setOrg(data);
  }

  const isLoading = useLoading(loadOrg, [orgId]);

  return (
    <>
      <Header
        isLoading={isLoading}
        resource={{
          impl: resourceTypes.org,
          ...org,
        }}
      >
        <Nav>
          <NavLink to="./">Organization Info</NavLink>
          <NavLink to="members">Members</NavLink>
          <NavLink to="projects">Projects</NavLink>
        </Nav>
      </Header>
      <OrgContext.Provider
        value={{
          org,
          loadOrg,
          orgIsLoading: isLoading,
        }}
      >
        {children}
      </OrgContext.Provider>
    </>
  );
}

WithOrgHeader.propTypes = {
  children: PropTypes.node.isRequired,
  orgId: PropTypes.string,
};

WithOrgHeader.defaultProps = {
  orgId: null,
};
