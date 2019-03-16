import PropTypes from "prop-types";
import React from "react";
import { deleteRule, listRules } from "../../api";
import { poll } from "../../utils";
import DeleteDialog from "../shared/DeleteDialog";

export default function DeleteRuleDialog({ onDelete, rule }) {
  return (
    <DeleteDialog
      resource={rule}
      onConfirm={async () => {
        await deleteRule(rule.id);
        await poll(async () => {
          const { items } = await listRules(rule.projectId);
          return items.every(item => item.id !== rule.id);
        });
        await onDelete();
      }}
    />
  );
}

DeleteRuleDialog.propTypes = {
  onDelete: PropTypes.func.isRequired,
  rule: PropTypes.shape({
    id: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
  }).isRequired,
};
