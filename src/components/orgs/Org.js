import { Match } from "@reach/router";
import PropTypes from "prop-types";
import React from "react";
import { viewOrg } from "../../api";
import { Nav, NavLink } from "../../design-system";
import Header from "../shared/Header";
import { orgType } from "../shared/resourceTypes";
import useLoading from "../shared/useLoading";
import useResource from "../shared/useResource";
import OrgContext from "./OrgContext";

export default function Org({ children, orgId }) {
  const [org, setOrg] = useResource(orgType, {});

  async function loadOrg() {
    const data = await viewOrg(orgId);
    setOrg(data);
  }

  const isLoading = useLoading(loadOrg, [orgId]);

  return (
    <OrgContext.Provider
      value={{
        org,
        loadOrg,
        orgIsLoading: isLoading,
      }}
    >
      <Match path="/orgs/:orgId/projects/:projectId/*">
        {({ match }) =>
          !match && (
            <Header
              breadcrumbs={[
                !isLoading && {
                  to: "./",
                  resource: org,
                },
              ].filter(Boolean)}
            >
              <Nav>
                <NavLink to="./">Organization Info</NavLink>
                <NavLink to="members">Members</NavLink>
                <NavLink to="projects">Projects</NavLink>
              </Nav>
            </Header>
          )
        }
      </Match>
      {children}
    </OrgContext.Provider>
  );
}

Org.propTypes = {
  children: PropTypes.node.isRequired,
  orgId: PropTypes.string,
};

Org.defaultProps = {
  orgId: null,
};
