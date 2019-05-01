import PropTypes from "prop-types";
import React, { useContext } from "react";
import styled from "styled-components";
import { viewProject } from "../../api";
import { Nav, NavLink } from "../../design-system";
import OrgContext from "../orgs/OrgContext";
import Header from "../shared/Header";
import { projectType } from "../shared/resourceTypes";
import useLoading from "../shared/useLoading";
import useResource from "../shared/useResource";
import ProjectContext from "./ProjectContext";

const PlaceholderNav = styled.nav`
  min-height: var(--size-36);
`;

export default function Project({ children, projectId }) {
  const { org } = useContext(OrgContext);

  const [project, setProject] = useResource(projectType, {});

  async function loadProject() {
    const data = await viewProject(projectId);
    setProject(data);
  }

  const loading = useLoading(loadProject, [projectId]);

  const breadcrumbs = [
    {
      to: `../../`,
      resource: org,
    },
  ];
  return loading.isComplete ? (
    <ProjectContext.Provider value={{ project, loadProject }}>
      <Header
        breadcrumbs={[
          ...breadcrumbs,
          {
            to: "./",
            isPartiallyActive: true,
            resource: project,
          },
        ]}
      >
        <Nav>
          <NavLink to="./">Project Info</NavLink>
          <NavLink to="devices" isPartiallyActive>
            Devices
          </NavLink>
          <NavLink to="destinations" isPartiallyActive>
            Destinations
          </NavLink>
          <NavLink to="rules" isPartiallyActive>
            Rules
          </NavLink>
        </Nav>
      </Header>
      {children}
    </ProjectContext.Provider>
  ) : (
    <Header breadcrumbs={loading.error && breadcrumbs}>
      <PlaceholderNav />
    </Header>
  );
}

Project.propTypes = {
  children: PropTypes.node.isRequired,
  projectId: PropTypes.string,
};

Project.defaultProps = {
  projectId: null,
};
