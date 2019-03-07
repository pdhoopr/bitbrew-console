import PropTypes from "prop-types";
import React from "react";
import { createRule, listRules } from "../../api";
import { poll } from "../../utils";
import CreateOrUpdateForm from "../shared/CreateOrUpdateForm";
import resourceTypes from "../shared/resourceTypes";
import useForm from "../shared/useForm";
import RuleFormFields from "./RuleFormFields";

export default function CreateRuleForm({
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
    <CreateOrUpdateForm
      resource={resourceTypes.rule}
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
    </CreateOrUpdateForm>
  );
}

CreateRuleForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  project: PropTypes.string.isRequired,
  selectDestinationFrom: PropTypes.array.isRequired,
};
