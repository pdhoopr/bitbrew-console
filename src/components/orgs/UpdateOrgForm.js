import PropTypes from "prop-types";
import React from "react";
import { listOrgs, updateOrg } from "../../api";
import { poll } from "../../utils";
import { orgType } from "../shared/resourceTypes";
import UpdateForm from "../shared/UpdateForm";
import useForm from "../shared/useForm";
import OrgFormFields from "./OrgFormFields";

export default function UpdateOrgForm({ onUpdate, org }) {
  const [values, setValue] = useForm({
    name: org.name,
  });

  return (
    <UpdateForm
      resourceType={orgType}
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
      <OrgFormFields values={values} onChange={setValue} />
    </UpdateForm>
  );
}

UpdateOrgForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  org: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
