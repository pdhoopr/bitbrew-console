import React, { useContext, useState } from "react";
import styled from "styled-components";
import { listOrgs, listProjects } from "../api";
import { flatMap, localize, pluralize } from "../utils";
import GlobalContext from "./GlobalContext";
import useLoading from "./hooks/useLoading";
import NewOrgForm from "./orgs/NewOrgForm";
import NewProjectForm from "./projects/NewProjectForm";
import { Button } from "./ui/Buttons";
import { Card, CardLink } from "./ui/Cards";
import { FlexBetween } from "./ui/Flexboxes";
import { PageHeader } from "./ui/Headers";
import { AddIcon } from "./ui/Icons";
import { Link } from "./ui/Links";
import Nav from "./ui/Nav";
import {
  ContentHeading,
  PageHeading,
  SectionHeading,
  SubHeading,
  Text,
} from "./ui/Texts";
import { Width800 } from "./ui/Widths";

const WelcomeHeader = styled(PageHeader)`
  background-color: var(--color-black);
  box-shadow: var(--elevation-low);
  color: var(--color-white);
  padding-bottom: var(--size-32);
  padding-top: var(--size-68);
`;

const WelcomeText = styled(SubHeading)`
  color: var(--color-gray);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: var(--size-16);
  margin-top: var(--size-16);
`;

const OrgHeader = styled.header`
  grid-column: span 3;
  margin-top: var(--size-16);
`;

const ProjectLink = styled(CardLink)`
  min-height: var(--size-160);
`;

const ProjectDescription = styled(SubHeading)`
  margin-top: var(--size-16);
`;

const Spacer = styled.div`
  grid-column: span 3;
  height: ${({ fullHeight }) =>
    fullHeight ? "var(--size-48)" : "var(--size-8)"};
`;

const PlaceholderButton = styled(Button)`
  align-items: center;
  color: var(--color-dark-gray);
  display: flex;
  flex-direction: column;
  grid-column: ${({ fullWidth }) => fullWidth && "span 3"};
  justify-content: center;
  min-height: var(--size-160);
  padding: var(--size-16) var(--size-24);
  transition: color var(--duration-short);

  &:hover,
  &:focus {
    color: var(--color-green);
  }

  &::before {
    opacity: 0.08;
  }
`;

const PlaceholderIcon = styled(AddIcon).attrs({
  "aria-hidden": true,
})`
  fill: currentColor;
  height: var(--size-28);
  margin-bottom: var(--size-8);
  width: var(--size-28);
`;

export default function WelcomePage() {
  const { openDrawer } = useContext(GlobalContext);

  const [orgs, setOrgs] = useState([]);
  const [projects, setProjects] = useState([]);

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
    <React.Fragment>
      <Nav flat />
      <main>
        <WelcomeHeader>
          <Width800>
            <PageHeading>Welcome!</PageHeading>
            <WelcomeText>
              Use the BitBrew Console to manage your data pipeline.
            </WelcomeText>
          </Width800>
        </WelcomeHeader>
        {!isLoading && (
          <Width800>
            <Grid>
              {orgs.map(org => {
                const orgProjects = projects.filter(
                  project => project.orgId === org.id,
                );
                return (
                  <React.Fragment key={org.id}>
                    <OrgHeader>
                      <SectionHeading>
                        <Link to={`/orgs/${org.id}`}>{org.name}</Link>
                      </SectionHeading>
                      <FlexBetween>
                        <Text gray>Created on {localize(org.createdAt)}</Text>
                        <SubHeading gray>
                          {pluralize("project", orgProjects.length)}
                        </SubHeading>
                      </FlexBetween>
                    </OrgHeader>
                    {orgProjects.map(project => {
                      const projectName = project.name.trim();
                      const projectDescription = project.description.trim();
                      return (
                        <Card
                          key={project.id}
                          as={ContentHeading}
                          gray={!projectName}
                        >
                          <ProjectLink
                            to={`/orgs/${org.id}/projects/${project.id}`}
                          >
                            {project.name || "Unnamed project"}
                            <Text gray>
                              Created on {localize(project.createdAt)}
                            </Text>
                            {projectDescription && (
                              <ProjectDescription gray>
                                {project.description}
                              </ProjectDescription>
                            )}
                          </ProjectLink>
                        </Card>
                      );
                    })}
                    <PlaceholderButton
                      onClick={() => {
                        openDrawer(
                          <NewProjectForm
                            org={org.id}
                            orgName={org.name}
                            onCreate={loadOrgs}
                          />,
                        );
                      }}
                    >
                      <PlaceholderIcon />
                      New project
                    </PlaceholderButton>
                  </React.Fragment>
                );
              })}
              <Spacer fullHeight={orgs.length > 0} />
              <PlaceholderButton
                onClick={() => {
                  openDrawer(<NewOrgForm onCreate={loadOrgs} />);
                }}
                fullWidth
              >
                <PlaceholderIcon />
                New organization
              </PlaceholderButton>
            </Grid>
          </Width800>
        )}
      </main>
    </React.Fragment>
  );
}
