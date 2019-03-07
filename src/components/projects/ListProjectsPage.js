import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { listProjects } from "../../api";
import { Table, TableCell, TableRow } from "../../design-system";
import { localize } from "../../utils";
import GlobalContext from "../GlobalContext";
import ListPage from "../shared/ListPage";
import NameTableCell from "../shared/NameTableCell";
import resourceTypes from "../shared/resourceTypes";
import useLoading from "../shared/useLoading";
import CreateProjectForm from "./CreateProjectForm";

export default function ListProjectsPage({ orgId }) {
  const { openDrawer } = useContext(GlobalContext);

  const [projects, setProjects] = useState([]);

  async function loadProjects() {
    const { items } = await listProjects(orgId);
    setProjects(items);
  }

  const isLoading = useLoading(loadProjects, [orgId]);

  return (
    <ListPage
      isLoading={isLoading}
      resource={resourceTypes.project}
      onOpenForm={() => {
        openDrawer(<CreateProjectForm org={orgId} onCreate={loadProjects} />);
      }}
    >
      {projects.length > 0 && (
        <Table headings={["Name", "Created On", "Description"]}>
          {projects.map(project => (
            <TableRow key={project.id}>
              <NameTableCell
                resource={{
                  impl: resourceTypes.project,
                  ...project,
                }}
              />
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
