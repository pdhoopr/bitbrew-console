import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { listDestinations, listDevices, listRules } from "../../api";
import AppContext from "../AppContext";
import { destinationType, deviceType, ruleType } from "../shared/resourceTypes";
import useLoading from "../shared/useLoading";
import ViewScreen from "../shared/ViewScreen";
import DeleteProjectDialog from "./DeleteProjectDialog";
import ProjectContext from "./ProjectContext";
import UpdateProjectForm from "./UpdateProjectForm";

export default function ViewProjectScreen({ navigate, projectId }) {
  const { openDialog, openDrawer } = useContext(AppContext);
  const { loadProject, project } = useContext(ProjectContext);

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

  const loading = useLoading(loadMetrics, [projectId]);

  return (
    <ViewScreen
      showContent={loading.isComplete}
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
      onOpenUpdate={() => {
        openDrawer(
          <UpdateProjectForm project={project} onUpdate={loadProject} />,
        );
      }}
      onOpenDelete={() => {
        openDialog(
          <DeleteProjectDialog
            project={project}
            onDelete={() => {
              navigate("/");
            }}
          />,
        );
      }}
    />
  );
}

ViewProjectScreen.propTypes = {
  navigate: PropTypes.func,
  projectId: PropTypes.string,
};

ViewProjectScreen.defaultProps = {
  navigate: null,
  projectId: null,
};
