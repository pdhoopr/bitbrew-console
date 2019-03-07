import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { createOrg } from "../../api";
import { poll, silentRefresh } from "../../utils";
import GlobalContext from "../GlobalContext";
import CreateOrUpdateForm from "../shared/CreateOrUpdateForm";
import resourceTypes from "../shared/resourceTypes";
import useForm from "../shared/useForm";
import OrgFormFields from "./OrgFormFields";

export default function CreateOrgForm({ onCreate }) {
  const { logInWithToken, logOut } = useContext(GlobalContext);

  const [values, setValue] = useForm({
    name: "",
  });

  return (
    <CreateOrUpdateForm
      resource={resourceTypes.org}
      onSubmit={async () => {
        const data = await createOrg(values);
        await poll(async () => {
          try {
            const token = await silentRefresh();
            if (jwtDecode(token).orgs.some(org => org.startsWith(data.id))) {
              logInWithToken(token);
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
      <OrgFormFields values={values} setValue={setValue} />
    </CreateOrUpdateForm>
  );
}

CreateOrgForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
