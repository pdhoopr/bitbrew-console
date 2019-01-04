import React, { useContext, useState } from "react";
import styled from "styled-components";
import { listOrgs, listProjects } from "../api";
import { flatMap, localize, pluralize } from "../utils";
import Context from "./Context";
import useForm from "./hooks/useForm";
import useLoading from "./hooks/useLoading";
import NewOrgForm from "./orgs/NewOrgForm";
import NewProjectForm from "./projects/NewProjectForm";
import ProjectContent from "./projects/ProjectContent";
import AppBar from "./ui/AppBar";
import { Button, RaisedButton } from "./ui/Buttons";
import { FlexBetween } from "./ui/Flexboxes";
import { PageHeader } from "./ui/Headers";
import { ArrowDownInlineIcon } from "./ui/Icons";
import { Link } from "./ui/Links";
import Logo from "./ui/Logo";
import Menu from "./ui/Menu";
import Search from "./ui/Search";
import { Section } from "./ui/Sections";
import { PageHeading, SectionHeading, SubHeading, Text } from "./ui/Texts";
import { Width640 } from "./ui/Widths";

const WelcomeHeader = styled(PageHeader)`
  background-color: var(--color-black);
  color: var(--color-white);
`;

const Heading = styled(PageHeading)`
  margin-top: var(--size-32);
`;

const Actions = styled(FlexBetween)`
  margin-bottom: var(--size-32);
  margin-top: var(--size-32);
`;

export default function WelcomePage() {
  const { openDrawer } = useContext(Context);

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

  const [values, setValue] = useForm({
    searchTerm: "",
  });

  return (
    <main>
      <WelcomeHeader>
        <Width640>
          <AppBar>
            <Logo />
          </AppBar>
          <Heading>Welcome!</Heading>
          <SubHeading>
            Use the BitBrew Console to manage your data pipeline.
          </SubHeading>
        </Width640>
      </WelcomeHeader>
      {!isLoading && (
        <Width640>
          <Actions>
            <Search
              description="The list of organizations below will change to show only those with project names matching the search term."
              value={values.searchTerm}
              onChange={setValue}
              placeholder="Search by project name"
            />
            <Menu
              control={
                <RaisedButton>
                  New <ArrowDownInlineIcon />
                </RaisedButton>
              }
            >
              <Button
                onClick={() => {
                  openDrawer(<NewOrgForm onCreate={loadOrgs} />);
                }}
              >
                Organization
              </Button>
              <Button
                onClick={() => {
                  openDrawer(
                    <NewProjectForm selectOrgFrom={orgs} onCreate={loadOrgs} />,
                  );
                }}
              >
                Project
              </Button>
            </Menu>
          </Actions>
          {orgs.map(org => {
            const searchResults = projects.filter(
              project =>
                project.orgId === org.id &&
                project.name
                  .toUpperCase()
                  .includes(values.searchTerm.toUpperCase()),
            );
            return (
              (values.searchTerm === "" || searchResults.length > 0) && (
                <Section key={org.id}>
                  <SectionHeading>
                    <Link to={`/orgs/${org.id}`}>{org.name}</Link>
                  </SectionHeading>
                  <FlexBetween>
                    <Text gray>Created on {localize(org.createdAt)}</Text>
                    <Text gray>
                      {pluralize("project", searchResults.length)}
                    </Text>
                  </FlexBetween>
                  {searchResults.map(project => (
                    <ProjectContent
                      key={project.id}
                      project={{
                        ...project,
                        orgName: org.name,
                      }}
                      onUpdate={loadOrgs}
                      onDelete={loadOrgs}
                    />
                  ))}
                </Section>
              )
            );
          })}
        </Width640>
      )}
    </main>
  );
}
