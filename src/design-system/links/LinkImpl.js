import { Link as ReachLink } from "@reach/router";
import PropTypes from "prop-types";
import React from "react";

export default function LinkImpl({ isExternal, green, to, ...props }) {
  return isExternal ? (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a href={to} rel="noopener noreferrer" target="_blank" {...props} />
  ) : (
    <ReachLink to={to} {...props} />
  );
}

LinkImpl.propTypes = {
  green: PropTypes.bool,
  isExternal: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

LinkImpl.defaultProps = {
  green: false,
  isExternal: false,
};
