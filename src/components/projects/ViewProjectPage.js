import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { listDestinations, listDevices, listRules } from "../../api";
import AppContext from "../AppContext";
import { destinationType, deviceType, ruleType } from "../shared/resourceTypes";
import useLoading from "../shared/useLoading";
import ViewPage from "../shared/ViewPage";
import DeleteProjectDialog from "./DeleteProjectDialog";
import ProjectContext from "./ProjectContext";
import UpdateProjectForm from "./UpdateProjectForm";

export default function ViewProjectPage({ navigate, projectId }) {
  const { openDialog, openDrawer } = useContext(AppContext);
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
        ...project,
        updatedAt: null,
      }}
      metrics={[
        {
          label: deviceType,
          value: numDevices,
        },
        {
          label: destinationType,
          value: numDestinations,
        },
        {
          label: ruleType,
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
