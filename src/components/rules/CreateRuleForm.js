import PropTypes from "prop-types";
import React from "react";
import { createRule, listRules } from "../../api";
import { poll } from "../../utils";
import CreateForm from "../shared/CreateForm";
import { ruleType } from "../shared/resourceTypes";
import useForm from "../shared/useForm";
import RuleFormFields from "./RuleFormFields";

export default function CreateRuleForm({
  onCreate,
  projectId,
  selectDestinationFrom,
}) {
  const [values, setValue] = useForm({
    projectId,
    name: "",
    enabled: true,
    triggerRuleWhen: "",
    dataTransformation: "",
    destinationId: "",
  });

  return (
    <CreateForm
      resourceType={ruleType}
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
        onChange={setValue}
      />
    </CreateForm>
  );
}

CreateRuleForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  selectDestinationFrom: PropTypes.array.isRequired,
};
