import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { listDestinations, listDevices, listRules } from "../../api";
import GlobalContext from "../GlobalContext";
import resourceTypes from "../shared/resourceTypes";
import useLoading from "../shared/useLoading";
import ViewPage from "../shared/ViewPage";
import DeleteProjectDialog from "./DeleteProjectDialog";
import ProjectContext from "./ProjectContext";
import UpdateProjectForm from "./UpdateProjectForm";

export default function ViewProjectPage({ navigate, projectId }) {
  const { openDialog, openDrawer } = useContext(GlobalContext);
  const { loadProject, project, projectIsLoading } = useContext(ProjectContext);

  const [numDevices, setNumDevices] = useState(0);
  const [numDestinations, setNumDestinations] = useState(0);
  const [numRules, setNumRules] = useState(0);

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

  return (
    <ViewPage
      isLoading={projectIsLoading || metricsAreLoading}
      resource={{
        impl: resourceTypes.project,
        ...project,
        enabled: null,
        updatedAt: null,
      }}
      metrics={[
        {
          label: resourceTypes.device,
          value: numDevices,
        },
        {
          label: resourceTypes.destination,
          value: numDestinations,
        },
        {
          label: resourceTypes.rule,
          value: numRules,
        },
      ]}
      onOpenForm={() => {
        openDrawer(
          <UpdateProjectForm project={project} onUpdate={loadProject} />,
        );
      }}
      onOpenDialog={() => {
        openDialog(
          <DeleteProjectDialog
            project={project}
            onDelete={() => {
              navigate("../");
            }}
          />,
        );
      }}
    />
  );
}

ViewProjectPage.propTypes = {
  navigate: PropTypes.func,
  projectId: PropTypes.string,
};

ViewProjectPage.defaultProps = {
  navigate: null,
  projectId: null,
};
