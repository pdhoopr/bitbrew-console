import PropTypes from "prop-types";
import React from "react";
import { listProjects, updateProject } from "../../api";
import { poll } from "../../utils";
import { projectType } from "../shared/resourceTypes";
import UpdateForm from "../shared/UpdateForm";
import useForm from "../shared/useForm";
import ProjectFormFields from "./ProjectFormFields";

export default function UpdateProjectForm({ onUpdate, project }) {
  const [values, setValue] = useForm({
    orgId: project.orgId,
    name: project.name,
    description: project.description,
    usesSimulatedDevices: project.usesSimulatedDevices,
  });

  return (
    <UpdateForm
      resourceType={projectType}
      onSubmit={async () => {
        const data = await updateProject(project.id, values);
        await poll(async () => {
          const { items } = await listProjects(data.orgId);
          const found = items.find(item => item.id === data.id);
          return !found || found.updatedAt === data.updatedAt;
        });
        await onUpdate();
      }}
    >
      <ProjectFormFields values={values} onChange={setValue} />
    </UpdateForm>
  );
}

UpdateProjectForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  project: PropTypes.shape({
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    orgId: PropTypes.string.isRequired,
    usesSimulatedDevices: PropTypes.bool.isRequired,
  }).isRequired,
};
