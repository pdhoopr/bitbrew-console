import PropTypes from "prop-types";
import React from "react";
import { listProjects, updateProject } from "../../api";
import { poll } from "../../utils";
import useForm from "../hooks/useForm";
import FormDrawer from "../ui/FormDrawer";
import ProjectFormFields from "./ProjectFormFields";

export default function EditProjectForm({ onUpdate, project }) {
  const [values, setValue] = useForm({
    orgId: project.orgId,
    name: project.name,
    description: project.description,
    usesSimulatedDevices: project.usesSimulatedDevices,
  });

  return (
    <FormDrawer
      heading="Edit Project"
      buttonText="Save"
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
      <ProjectFormFields
        org={project.orgName || null}
        values={values}
        setValue={setValue}
      />
    </FormDrawer>
  );
}

EditProjectForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  project: PropTypes.shape({
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    orgId: PropTypes.string.isRequired,
    orgName: PropTypes.string,
    usesSimulatedDevices: PropTypes.bool.isRequired,
  }).isRequired,
};
