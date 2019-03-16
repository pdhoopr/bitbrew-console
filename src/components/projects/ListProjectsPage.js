import PropTypes from "prop-types";
import React, { useContext } from "react";
import { listProjects } from "../../api";
import { Table, TableCell, TableRow } from "../../design-system";
import { localize } from "../../utils";
import AppContext from "../AppContext";
import ListPage from "../shared/ListPage";
import NameTableCell from "../shared/NameTableCell";
import { projectType } from "../shared/resourceTypes";
import useLoading from "../shared/useLoading";
import useResource from "../shared/useResource";
import CreateProjectForm from "./CreateProjectForm";

export default function ListProjectsPage({ orgId }) {
  const { openDrawer } = useContext(AppContext);

  const [projects, setProjects] = useResource(projectType, []);

  async function loadProjects() {
    const { items } = await listProjects(orgId);
    setProjects(items);
  }

  const isLoading = useLoading(loadProjects, [orgId]);

  return (
    <ListPage
      isLoading={isLoading}
      resourceType={projectType}
      onOpenForm={() => {
        openDrawer(<CreateProjectForm orgId={orgId} onCreate={loadProjects} />);
      }}
    >
      {projects.length > 0 && (
        <Table headings={["Name", "Created On", "Description"]}>
          {projects.map(project => (
            <TableRow key={project.id}>
              <NameTableCell resource={project} />
              <TableCell>{localize(project.createdAt)}</TableCell>
              <TableCell>{project.description}</TableCell>
            </TableRow>
          ))}
        </Table>
      )}
    </ListPage>
  );
}

ListProjectsPage.propTypes = {
  orgId: PropTypes.string,
};

ListProjectsPage.defaultProps = {
  orgId: null,
};
