import PropTypes from "prop-types";
import React from "react";

export default function Form({ children, onSubmit }) {
  return (
    <form onSubmit={onSubmit} autoComplete="off" noValidate>
      {children}
    </form>
  );
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
