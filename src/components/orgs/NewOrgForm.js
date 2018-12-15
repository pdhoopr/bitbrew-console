import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import { createOrg } from "../../api";
import { poll, silentRefresh } from "../../utils";
import Context from "../Context";
import useForm from "../hooks/useForm";
import FormDrawer from "../ui/FormDrawer";
import OrgFormFields from "./OrgFormFields";

export default function NewOrgForm({ onCreate }) {
  const { signInWithToken, signOut } = useContext(Context);

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
              signInWithToken(token);
              return true;
            }
          } catch {
            signOut();
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
