import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { listDestinations, listDevices, listRules } from "../../api";
import { localize, pluralize } from "../../utils";
import GlobalContext from "../GlobalContext";
import useLoading from "../hooks/useLoading";
import BackLink from "../ui/BackLink";
import { RaisedButton } from "../ui/Buttons";
import { Card, CardLink } from "../ui/Cards";
import DeleteButton from "../ui/DeleteButton";
import { FlexBetween } from "../ui/Flexboxes";
import { PageHeader } from "../ui/Headers";
import List from "../ui/List";
import { Content, Section } from "../ui/Sections";
import { PageHeading, SectionHeading, SubHeading } from "../ui/Texts";
import { Width800 } from "../ui/Widths";
import DeleteProjectDialog from "./DeleteProjectDialog";
import EditProjectForm from "./EditProjectForm";
import ProjectContext from "./ProjectContext";

const EditButton = styled(RaisedButton)`
  align-self: flex-start;
  margin-left: var(--size-24);
  margin-top: var(--size-2);
`;

export default function ProjectInfoPage({ navigate, orgId, projectId }) {
  const { openDialog, openDrawer } = useContext(GlobalContext);
  const { loadProject, project, projectIsLoading } = useContext(ProjectContext);

  const [numDevices, setNumDevices] = useState([]);
  const [numDestinations, setNumDestinations] = useState([]);
  const [numRules, setNumRules] = useState([]);

  async function loadMetrics() {
    const [
      { totalItems: totalDevices },
      { totalItems: totalDestinations },
      { totalItems: totalRules },
    ] = await Promise.all([
      listDevices(projectId),
      listDestinations(projectId),
      listRules(projectId),
    ]);
    setNumDevices(totalDevices);
    setNumDestinations(totalDestinations);
    setNumRules(totalRules);
  }

  const metricsAreLoading = useLoading(loadMetrics, [projectId]);

  const projectsUrl = `/orgs/${orgId}/projects`;
  const name = project.name && project.name.trim();
  const description = project.description && project.description.trim();
  return (
    <main>
      <Width800>
        <BackLink
          to={projectsUrl}
          title="View all projects in this organization"
        />
        {!projectIsLoading && !metricsAreLoading && (
          <React.Fragment>
            <PageHeader>
              <FlexBetween>
                <div>
                  <PageHeading gray={!name}>
                    {name || "Unnamed project"}
                  </PageHeading>
                  {description && <SubHeading gray>{description}</SubHeading>}
                </div>
                <EditButton
                  onClick={() => {
                    openDrawer(
                      <EditProjectForm
                        project={project}
                        onUpdate={loadProject}
                      />,
                    );
                  }}
                >
                  Edit
                </EditButton>
              </FlexBetween>
            </PageHeader>
            <Section>
              <FlexBetween gap>
                {[
                  [numDevices, "device"],
                  [numDestinations, "destination"],
                  [numRules, "rule"],
                ].map(([num, label]) => (
                  <Card key={label} as={SectionHeading}>
                    <CardLink to={`${projectsUrl}/${projectId}/${label}s`}>
                      {num}
                      <SubHeading as="p" gray>
                        {pluralize(label, num).replace(/^\d+\s/, "")}
                      </SubHeading>
                    </CardLink>
                  </Card>
                ))}
              </FlexBetween>
            </Section>
            <Section>
              <SectionHeading>Overview</SectionHeading>
              <Content>
                <List
                  items={[
                    ["ID", project.id],
                    ["Created On", localize(project.createdAt)],
                  ]}
                />
              </Content>
            </Section>
            <DeleteButton
              onClick={() => {
                openDialog(
                  <DeleteProjectDialog
                    project={project}
                    onDelete={() => {
                      navigate(projectsUrl);
                    }}
                  />,
                );
              }}
            >
              Delete this project
            </DeleteButton>
          </React.Fragment>
        )}
      </Width800>
    </main>
  );
}

ProjectInfoPage.propTypes = {
  navigate: PropTypes.func,
  orgId: PropTypes.string,
  projectId: PropTypes.string,
};

ProjectInfoPage.defaultProps = {
  navigate: null,
  orgId: null,
  projectId: null,
};
