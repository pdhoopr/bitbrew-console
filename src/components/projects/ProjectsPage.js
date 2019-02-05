import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { listProjects } from "../../api";
import { pluralize } from "../../utils";
import GlobalContext from "../GlobalContext";
import useForm from "../hooks/useForm";
import useLoading from "../hooks/useLoading";
import { RaisedButton } from "../ui/Buttons";
import { FlexBetween } from "../ui/Flexboxes";
import { PageHeader } from "../ui/Headers";
import Search from "../ui/Search";
import { PageHeading, Text } from "../ui/Texts";
import { Width640 } from "../ui/Widths";
import NewProjectForm from "./NewProjectForm";
import ProjectContent from "./ProjectContent";

const ProjectCount = styled(Text)`
  margin-top: var(--size-32);
`;

export default function ProjectsPage({ orgId }) {
  const { openDrawer } = useContext(GlobalContext);

  const [projects, setProjects] = useState([]);

  async function loadProjects() {
    const { items } = await listProjects(orgId);
    setProjects(items);
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
      <Width640>
        <PageHeader>
          <FlexBetween>
            <PageHeading>Projects</PageHeading>
            <RaisedButton
              onClick={() => {
                openDrawer(
                  <NewProjectForm org={orgId} onCreate={loadProjects} />,
                );
              }}
            >
              New
            </RaisedButton>
          </FlexBetween>
        </PageHeader>
        {!isLoading && (
          <React.Fragment>
            <Search
              description="The list of projects below will change to show only those with names matching the search term."
              value={values.searchTerm}
              onChange={setValue}
              placeholder="Search by project name"
            />
            <ProjectCount gray>
              {pluralize("project", searchResults.length)}
            </ProjectCount>
            {searchResults.map(project => (
              <ProjectContent
                key={project.id}
                project={project}
                onUpdate={loadProjects}
                onDelete={loadProjects}
              />
            ))}
          </React.Fragment>
        )}
      </Width640>
    </main>
  );
}

ProjectsPage.propTypes = {
  orgId: PropTypes.string,
};

ProjectsPage.defaultProps = {
  orgId: null,
};
