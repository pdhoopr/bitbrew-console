import PropTypes from "prop-types";
import React, { useContext } from "react";
import { viewProject } from "../../api";
import { Nav, NavLink } from "../../design-system";
import OrgContext from "../orgs/OrgContext";
import Header from "../shared/Header";
import { projectType } from "../shared/resourceTypes";
import useLoading from "../shared/useLoading";
import useResource from "../shared/useResource";
import ProjectContext from "./ProjectContext";

export default function Project({ children, projectId }) {
  const { org, orgIsLoading } = useContext(OrgContext);

  const [project, setProject] = useResource(projectType, {});

  async function loadProject() {
    const data = await viewProject(projectId);
    setProject(data);
  }

  const isLoading = useLoading(loadProject, [projectId]);

  return (
    <ProjectContext.Provider
      value={{
        project,
        loadProject,
        projectIsLoading: isLoading,
      }}
    >
      <Header
        breadcrumbs={[
          !orgIsLoading && {
            to: `../../`,
            resource: org,
          },
          !(orgIsLoading || isLoading) && {
            to: "./",
            resource: project,
          },
        ].filter(Boolean)}
      >
        <Nav>
          <NavLink to="./">Project Info</NavLink>
          <NavLink to="devices" isActiveOnNestedRoutes>
            Devices
          </NavLink>
          <NavLink to="destinations" isActiveOnNestedRoutes>
            Destinations
          </NavLink>
          <NavLink to="rules" isActiveOnNestedRoutes>
            Rules
          </NavLink>
        </Nav>
      </Header>
      {children}
    </ProjectContext.Provider>
  );
}

Project.propTypes = {
  children: PropTypes.node.isRequired,
  projectId: PropTypes.string,
};

Project.defaultProps = {
  projectId: null,
};
