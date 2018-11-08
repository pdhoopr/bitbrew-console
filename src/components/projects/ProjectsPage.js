import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { listProjects, viewOrg } from "../../api";
import { pluralize } from "../../utils";
import Context from "../Context";
import useForm from "../hooks/useForm";
import useLoading from "../hooks/useLoading";
import AppBar from "../ui/AppBar";
import { RaisedButton } from "../ui/Buttons";
import { FlexBetween } from "../ui/Flexboxes";
import { PageHeader } from "../ui/Headers";
import Search from "../ui/Search";
import { PageTitle, Text } from "../ui/Texts";
import { Width640 } from "../ui/Widths";
import NewProjectForm from "./NewProjectForm";
import ProjectContent from "./ProjectContent";

const NewProjectButton = styled(RaisedButton)`
  margin-left: var(--size-16);
`;

const ProjectCount = styled(Text)`
  margin-top: var(--size-32);
`;

export default function ProjectsPage({ orgId }) {
  const { openDrawer } = useContext(Context);

  const [projects, setProjects] = useState([]);
  const [org, setOrg] = useState({});

  async function loadProjects() {
    const [{ items }, orgData] = await Promise.all([
      listProjects(orgId),
      viewOrg(orgId),
    ]);
    setProjects(items);
    setOrg(orgData);
  }

  const isLoading = useLoading(loadProjects, [orgId]);

  const [values, setValue] = useForm({
    searchTerm: "",
  });

  const searchResults = projects.filter(project =>
    project.name.toUpperCase().includes(values.searchTerm.toUpperCase()),
  );
  return (
    <main>
      <PageHeader>
        <AppBar>
          <PageTitle>Projects</PageTitle>
        </AppBar>
      </PageHeader>
      {!isLoading && (
        <Width640>
          <FlexBetween>
            <Search
              description="The list of projects below will change to show only those with names matching the search term."
              value={values.searchTerm}
              onChange={setValue}
              placeholder="Search by project name"
            />
            <NewProjectButton
              onClick={() => {
                openDrawer(
                  <NewProjectForm org={org} onCreate={loadProjects} />,
                );
              }}
            >
              New
            </NewProjectButton>
          </FlexBetween>
          <ProjectCount gray>
            {pluralize("project", searchResults.length)}
          </ProjectCount>
          {searchResults.map(project => (
            <ProjectContent
              key={project.id}
              project={{
                ...project,
                orgName: org.name,
              }}
              onUpdate={loadProjects}
              onDelete={loadProjects}
            />
          ))}
        </Width640>
      )}
    </main>
  );
}

ProjectsPage.propTypes = {
  orgId: PropTypes.string,
};

ProjectsPage.defaultProps = {
  orgId: null,
};
