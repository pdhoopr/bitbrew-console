import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { createOrg } from "../../api";
import { poll, silentRefresh } from "../../utils";
import GlobalContext from "../GlobalContext";
import useForm from "../hooks/useForm";
import FormDrawer from "../ui/FormDrawer";
import OrgFormFields from "./OrgFormFields";

export default function NewOrgForm({ onCreate }) {
  const { logInWithToken, logOut } = useContext(GlobalContext);

  const [values, setValue] = useForm({
    name: "",
  });

  return (
    <FormDrawer
      heading="New Organization"
      buttonText="Create"
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
    </FormDrawer>
  );
}

NewOrgForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
};
