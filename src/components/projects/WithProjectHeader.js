import PropTypes from "prop-types";
import React, { useState } from "react";
import { viewProject } from "../../api";
import { Nav, NavLink } from "../../design-system";
import Header from "../shared/Header";
import resourceTypes from "../shared/resourceTypes";
import useLoading from "../shared/useLoading";
import ProjectContext from "./ProjectContext";

export default function WithProjectHeader({ children, projectId }) {
  const [project, setProject] = useState({});

  async function loadProject() {
    const data = await viewProject(projectId);
    setProject(data);
  }

  const isLoading = useLoading(loadProject, [projectId]);

  return (
    <>
      <Header
        isLoading={isLoading}
        resource={{
          impl: resourceTypes.project,
          ...project,
        }}
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
      <ProjectContext.Provider
        value={{
          project,
          loadProject,
          projectIsLoading: isLoading,
        }}
      >
        {children}
      </ProjectContext.Provider>
    </>
  );
}

WithProjectHeader.propTypes = {
  children: PropTypes.node.isRequired,
  projectId: PropTypes.string,
};

WithProjectHeader.defaultProps = {
  projectId: null,
};
