import PropTypes from "prop-types";
import React, { useContext } from "react";
import { listProjects } from "../../api";
import { TableCell, TableRow } from "../../design-system";
import { localize } from "../../utils";
import AppContext from "../AppContext";
import ListScreen from "../shared/ListScreen";
import NameTableCell from "../shared/NameTableCell";
import PaginatedTable from "../shared/PaginatedTable";
import { projectType } from "../shared/resourceTypes";
import usePagination from "../shared/usePagination";
import useResource from "../shared/useResource";
import CreateProjectForm from "./CreateProjectForm";

export default function ListProjectsScreen({ orgId }) {
  const { openDrawer } = useContext(AppContext);

  const [projects, setProjects] = useResource(projectType, []);

  async function loadProjects(params) {
    const { items, ...pageData } = await listProjects(orgId, params);
    setProjects(items);
    return pageData;
  }

  const pagination = usePagination(loadProjects, [orgId]);

  return (
    <ListScreen
      isLoading={pagination.isLoading}
      resourceType={projectType}
      onOpenCreate={() => {
        openDrawer(
          <CreateProjectForm
            orgId={orgId}
            onCreate={pagination.loadFirstPage}
          />,
        );
      }}
    >
      {pagination.hasItems && (
        <PaginatedTable
          resourceType={projectType}
          headings={["Name", "Created On", "Description"]}
          pagination={pagination}
        >
          {projects.map(project => (
            <TableRow key={project.id}>
              <NameTableCell resource={project} />
              <TableCell>{localize(project.createdAt)}</TableCell>
              <TableCell>{project.description}</TableCell>
            </TableRow>
          ))}
        </PaginatedTable>
      )}
    </ListScreen>
  );
}

ListProjectsScreen.propTypes = {
  orgId: PropTypes.string,
};

ListProjectsScreen.defaultProps = {
  orgId: null,
};
