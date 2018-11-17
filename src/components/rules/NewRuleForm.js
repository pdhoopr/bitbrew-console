import PropTypes from "prop-types";
import React from "react";
import { createRule, listRules } from "../../api";
import { poll } from "../../utils";
import useForm from "../hooks/useForm";
import FormDrawer from "../ui/FormDrawer";
import RuleFormFields from "./RuleFormFields";

export default function NewRuleForm({
  onCreate,
  project,
  selectDestinationFrom,
}) {
  const [values, setValue] = useForm({
    projectId: project,
    name: "",
    enabled: true,
    triggerRuleWhen: "",
    dataTransformation: "",
    destinationId: "",
  });

  return (
    <FormDrawer
      heading="New Rule"
      buttonText="Create"
      onSubmit={async () => {
        const data = await createRule(values);
        await poll(async () => {
          const { items } = await listRules(data.projectId);
          return items.some(item => item.id === data.id);
        });
        await onCreate();
      }}
    >
      <RuleFormFields
        selectDestinationFrom={selectDestinationFrom}
        values={values}
        setValue={setValue}
      />
    </FormDrawer>
  );
}

NewRuleForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  project: PropTypes.string.isRequired,
  selectDestinationFrom: PropTypes.array.isRequired,
};
