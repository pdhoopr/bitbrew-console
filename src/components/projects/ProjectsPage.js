import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { listProjects } from "../../api";
import { localize } from "../../utils";
import GlobalContext from "../GlobalContext";
import useLoading from "../hooks/useLoading";
import { RaisedButton } from "../ui/Buttons";
import { FlexBetween } from "../ui/Flexboxes";
import { PageHeader } from "../ui/Headers";
import { Link } from "../ui/Links";
import Table, { Cell, Row } from "../ui/Table";
import { PageHeading } from "../ui/Texts";
import { Width800 } from "../ui/Widths";
import NewProjectForm from "./NewProjectForm";

export default function ProjectsPage({ orgId }) {
  const { openDrawer } = useContext(GlobalContext);

  const [projects, setProjects] = useState([]);

  async function loadProjects() {
    const { items } = await listProjects(orgId);
    setProjects(items);
  }

  const isLoading = useLoading(loadProjects, [orgId]);

  return (
    <main>
      <Width800>
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
          <Table
            columns={["Name", "Created On", "Description"]}
            emptyState="There are no projects in this organization yet."
          >
            {projects.map(project => {
              const name = project.name.trim();
              return (
                <Row key={project.id}>
                  <Cell gray={!name}>
                    <Link to={`/orgs/${orgId}/projects/${project.id}`}>
                      {name || "Unnamed project"}
                    </Link>
                  </Cell>
                  <Cell>{localize(project.createdAt)}</Cell>
                  <Cell>{project.description}</Cell>
                </Row>
              );
            })}
          </Table>
        )}
      </Width800>
    </main>
  );
}

ProjectsPage.propTypes = {
  orgId: PropTypes.string,
};

ProjectsPage.defaultProps = {
  orgId: null,
};
