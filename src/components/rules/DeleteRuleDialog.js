import PropTypes from "prop-types";
import React from "react";
import { deleteRule, listRules } from "../../api";
import { poll } from "../../utils";
import DeleteDialog from "../ui/DeleteDialog";
import Panel from "../ui/Panel";
import { Text } from "../ui/Texts";

export default function DeleteRuleDialog({ onDelete, rule }) {
  return (
    <DeleteDialog
      heading="Delete Rule"
      onDelete={async () => {
        await deleteRule(rule.id);
        await poll(async () => {
          const { items } = await listRules(rule.projectId);
          return items.every(item => item.id !== rule.id);
        });
        await onDelete();
      }}
    >
      <Text>The following rule will be permanently deleted:</Text>
      <Panel
        items={[
          ["Rule", rule.name],
          ["Project", rule.projectName],
          ["Organization", rule.orgName],
        ]}
      />
      <Text>Are you sure you want to continue?</Text>
    </DeleteDialog>
  );
}

DeleteRuleDialog.propTypes = {
  onDelete: PropTypes.func.isRequired,
  rule: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    orgName: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    projectName: PropTypes.string.isRequired,
  }).isRequired,
};
