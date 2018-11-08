import PropTypes from "prop-types";
import React from "react";
import { listOrgs, updateOrg } from "../../api";
import { poll } from "../../utils";
import useForm from "../hooks/useForm";
import FormDrawer from "../ui/FormDrawer";
import OrgFormFields from "./OrgFormFields";

export default function EditOrgForm({ onUpdate, org }) {
  const [values, setValue] = useForm({
    name: org.name,
  });

  return (
    <FormDrawer
      title="Edit Organization"
      buttonText="Save"
      onSubmit={async () => {
        const data = await updateOrg(org.id, values);
        await poll(async () => {
          const { items } = await listOrgs();
          const found = items.find(item => item.id === data.id);
          return !found || found.updatedAt === data.updatedAt;
        });
        await onUpdate();
      }}
    >
      <OrgFormFields values={values} setValue={setValue} />
    </FormDrawer>
  );
}

EditOrgForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  org: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
