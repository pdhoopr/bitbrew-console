import PropTypes from "prop-types";
import React from "react";
import { deleteRule, listRules } from "../../api";
import { poll } from "../../utils";
import DeleteDialog from "../ui/DeleteDialog";
import { Text } from "../ui/Texts";

export default function DeleteRuleDialog({ onDelete, rule }) {
  const name = rule.name.trim();
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
      Are you sure you want to delete the rule{" "}
      <Text as="strong" gray={!name}>
        {name || "Unnamed rule"}
      </Text>
      ?
    </DeleteDialog>
  );
}

DeleteRuleDialog.propTypes = {
  onDelete: PropTypes.func.isRequired,
  rule: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
  }).isRequired,
};
