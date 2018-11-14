import PropTypes from "prop-types";
import React from "react";
import { createProject, listProjects } from "../../api";
import { poll } from "../../utils";
import useForm from "../hooks/useForm";
import FormDrawer from "../ui/FormDrawer";
import ProjectFormFields from "./ProjectFormFields";

export default function NewProjectForm({ onCreate, org, selectOrgFrom }) {
  const [values, setValue] = useForm({
    orgId: org,
    name: "",
    description: "",
    usesSimulatedDevices: false,
  });

  return (
    <FormDrawer
      heading="New Project"
      buttonText="Create"
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
        selectOrgFrom={selectOrgFrom}
        values={values}
        setValue={setValue}
      />
    </FormDrawer>
  );
}

NewProjectForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  org: PropTypes.string,
  selectOrgFrom: PropTypes.array,
};

NewProjectForm.defaultProps = {
  org: "",
  selectOrgFrom: null,
};
