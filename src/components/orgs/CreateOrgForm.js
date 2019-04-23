import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { createOrg } from "../../api";
import { poll, silentRefresh } from "../../utils";
import AppContext from "../AppContext";
import CreateForm from "../shared/CreateForm";
import { orgType } from "../shared/resourceTypes";
import useForm from "../shared/useForm";
import OrgFormFields from "./OrgFormFields";

export default function CreateOrgForm({ onCreate }) {
  const { logIn, logOut } = useContext(AppContext);

  const [values, setValue] = useForm({
    name: "",
  });

  return (
    <CreateForm
      resourceType={orgType}
      onSubmit={async () => {
        const data = await createOrg(values);
        await poll(async () => {
          try {
            const token = await silentRefresh();
            if (jwtDecode(token).orgs.some(org => org.startsWith(data.id))) {
              logIn(token);
              return true;
            }
          } catch {
            logOut();
          }
          return false;
        });
        await onCreate();
      }}
    >
      <OrgFormFields values={values} onChange={setValue} />
    </CreateForm>
  );
}

CreateOrgForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
