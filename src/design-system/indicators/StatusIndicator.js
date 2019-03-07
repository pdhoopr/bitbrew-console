import PropTypes from "prop-types";
import React from "react";
import SyncDisabledIcon from "../icons/SyncDisabledIcon";
import SyncIcon from "../icons/SyncIcon";
import SyncProblemIcon from "../icons/SyncProblemIcon";

export default function StatusIndicator({ status, title }) {
  return (
    <span title={title} aria-label={title}>
      {status === "disabled" && <SyncDisabledIcon />}
      {status === "enabled" && <SyncIcon />}
      {status === "problem" && <SyncProblemIcon />}
    </span>
  );
}

StatusIndicator.propTypes = {
  status: PropTypes.oneOf(["disabled", "enabled", "problem"]).isRequired,
  title: PropTypes.string.isRequired,
};
