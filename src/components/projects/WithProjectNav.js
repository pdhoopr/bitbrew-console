import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import { viewProject } from "../../api";
import useLoading from "../hooks/useLoading";
import Nav from "../ui/Nav";
import NavLink from "../ui/NavLink";
import ProjectContext from "./ProjectContext";

const Unnamed = styled.span`
  color: var(--color-gray);
`;

export default function WithProjectNav({ children, orgId, projectId }) {
  const [project, setProject] = useState({});

  async function loadProject() {
    const data = await viewProject(projectId);
    setProject(data);
  }

  const isLoading = useLoading(loadProject, [projectId]);

  const projectUrl = `/orgs/${orgId}/projects/${projectId}`;
  const name = project.name && project.name.trim();
  return (
    <React.Fragment>
      <Nav
        isLoading={isLoading}
        heading={name || <Unnamed>Unnamed project</Unnamed>}
      >
        <NavLink to={projectUrl} exact>
          Project Info
        </NavLink>
        <NavLink to={`${projectUrl}/devices`}>Devices</NavLink>
        <NavLink to={`${projectUrl}/destinations`}>Destinations</NavLink>
        <NavLink to={`${projectUrl}/rules`}>Rules</NavLink>
      </Nav>
      <ProjectContext.Provider
        value={{
          project,
          loadProject,
          projectIsLoading: isLoading,
        }}
      >
        {children}
      </ProjectContext.Provider>
    </React.Fragment>
  );
}

WithProjectNav.propTypes = {
  children: PropTypes.node.isRequired,
  orgId: PropTypes.string,
  projectId: PropTypes.string,
};

WithProjectNav.defaultProps = {
  orgId: null,
  projectId: null,
};
