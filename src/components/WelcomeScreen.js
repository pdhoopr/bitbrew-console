import React, { useContext } from "react";
import styled from "styled-components";
import { listOrgs, listProjects } from "../api";
import {
  AddIcon,
  BlockLink,
  Button,
  Card,
  Heading1,
  Heading2,
  Heading3,
  Link,
  Subheading,
  Text,
} from "../design-system";
import { flatMap, localize, pluralize } from "../utils";
import AppContext from "./AppContext";
import CreateOrgForm from "./orgs/CreateOrgForm";
import CreateProjectForm from "./projects/CreateProjectForm";
import Header from "./shared/Header";
import Main from "./shared/Main";
import Name from "./shared/Name";
import { orgType, projectType } from "./shared/resourceTypes";
import useLoading from "./shared/useLoading";
import useResource from "./shared/useResource";

const Intro = styled(Main)`
  padding-bottom: var(--size-32);
  padding-top: var(--size-68);
`;

const Tagline = styled(Subheading)`
  color: var(--color-medium-dark-gray);
`;

const OrgsAndProjects = styled(Main)`
  display: grid;
  grid-gap: var(--size-16);
  grid-template-columns: 1fr 1fr 1fr;
  padding-top: var(--size-16);
`;

const OrgIntro = styled.section`
  grid-column: span 3;
  padding-top: var(--size-16);
`;

const OrgDetails = styled.ul`
  align-items: center;
  color: var(--color-dark-gray);
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  margin-bottom: 0;
  margin-top: 0;
  padding-left: 0;
`;

const ProjectCard = styled(Card)`
  transition: box-shadow var(--effect-duration);

  &:hover,
  &:focus-within {
    box-shadow: var(--elevation-medium);
  }
`;

const ProjectLink = styled(BlockLink)`
  min-height: var(--size-160);

  &::before {
    content: none;
  }
`;

const ProjectDetails = styled(Text)`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: var(--size-24);
`;

const Spacer = styled.div`
  grid-column: span 3;
  height: ${({ fullHeight }) =>
    fullHeight ? "var(--size-32)" : "var(--size-8)"};
`;

const NewProjectButton = styled(Button)`
  align-items: center;
  color: var(--color-dark-gray);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: var(--size-160);
  padding: var(--size-16) var(--size-24);
  transition: color var(--effect-duration);

  &:hover,
  &:focus {
    color: var(--color-green);
  }

  &::before {
    opacity: 0.1;
  }
`;

const NewOrgButton = styled(NewProjectButton)`
  grid-column: span 3;
`;

const NewIcon = styled(AddIcon).attrs({
  "aria-hidden": true,
})`
  fill: currentColor;
  height: var(--size-28);
  margin-bottom: var(--size-8);
  width: var(--size-28);
`;

export default function WelcomeScreen() {
  const { openDrawer } = useContext(AppContext);

  const [orgs, setOrgs] = useResource(orgType, []);
  const [projects, setProjects] = useResource(projectType, []);

  async function loadOrgs() {
    const { items } = await listOrgs();
    const projectData = await Promise.all(
      items.map(item => listProjects(item.id)),
    );
    setOrgs(items);
    setProjects(
      flatMap(projectData, ({ items: projectItems }) => projectItems),
    );
  }

  const isLoading = useLoading(loadOrgs);

  return (
    <>
      <Header>
        <Intro as="div">
          <Heading1>Welcome!</Heading1>
          <Tagline>
            Use the BitBrew Console to manage your data pipeline.
          </Tagline>
        </Intro>
      </Header>
      {!isLoading && (
        <OrgsAndProjects>
          {orgs.map(org => {
            const orgUrl = `orgs/${org.id}`;
            const orgProjects = projects.filter(
              project => project.orgId === org.id,
            );
            return (
              <React.Fragment key={org.id}>
                <OrgIntro>
                  <Heading2>
                    <Link to={orgUrl}>{org.name}</Link>
                  </Heading2>
                  <OrgDetails>
                    <li>Created on {localize(org.createdAt)}</li>
                    <li>{pluralize("project", orgProjects.length)}</li>
                  </OrgDetails>
                </OrgIntro>
                {orgProjects.map(project => (
                  <ProjectCard key={project.id} as="section">
                    <ProjectLink to={`${orgUrl}/projects/${project.id}`}>
                      <Heading3>
                        <Name resource={project} />
                      </Heading3>
                      {project.description && (
                        <Subheading>{project.description}</Subheading>
                      )}
                      <ProjectDetails gray>
                        Created on {localize(project.createdAt)}
                      </ProjectDetails>
                    </ProjectLink>
                  </ProjectCard>
                ))}
                <NewProjectButton
                  onClick={() => {
                    openDrawer(
                      <CreateProjectForm
                        orgId={org.id}
                        orgName={org.name}
                        onCreate={loadOrgs}
                      />,
                    );
                  }}
                >
                  <NewIcon />
                  New project
                </NewProjectButton>
              </React.Fragment>
            );
          })}
          <Spacer fullHeight={orgs.length > 0} />
          <NewOrgButton
            onClick={() => {
              openDrawer(<CreateOrgForm onCreate={loadOrgs} />);
            }}
          >
            <NewIcon />
            New organization
          </NewOrgButton>
        </OrgsAndProjects>
      )}
    </>
  );
}
