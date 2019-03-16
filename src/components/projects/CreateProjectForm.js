import PropTypes from "prop-types";
import React from "react";
import { createProject, listProjects } from "../../api";
import { poll } from "../../utils";
import CreateOrUpdateForm from "../shared/CreateOrUpdateForm";
import { projectType } from "../shared/resourceTypes";
import useForm from "../shared/useForm";
import ProjectFormFields from "./ProjectFormFields";

export default function CreateProjectForm({ onCreate, orgId, orgName }) {
  const [values, setValue] = useForm({
    orgId,
    name: "",
    description: "",
    usesSimulatedDevices: false,
  });

  return (
    <CreateOrUpdateForm
      resourceType={projectType}
      onSubmit={async () => {
        const data = await createProject(values);
        await poll(async () => {
          const { items } = await listProjects(data.orgId);
          return items.some(item => item.id === data.id);
        });
        await onCreate();
      }}
    >
      <ProjectFormFields
        orgName={orgName}
        values={values}
        setValue={setValue}
      />
    </CreateOrUpdateForm>
  );
}

CreateProjectForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  orgId: PropTypes.string.isRequired,
  orgName: PropTypes.string,
};

CreateProjectForm.defaultProps = {
  orgName: null,
};
