import PropTypes from "prop-types";
import React from "react";
import ReactModal from "react-modal";

function getAriaProps(props) {
  return Object.entries(props)
    .filter(([key]) => key.startsWith("aria-"))
    .reduce(
      (ariaProps, [key, value]) => ({
        ...ariaProps,
        [key.replace(/^aria-/, "")]: value,
      }),
      { modal: true },
    );
}

export default function ModalImpl({ className, onClose, role, ...props }) {
  return (
    <ReactModal
      aria={getAriaProps(props)}
      bodyOpenClassName={`${className}__Body--open`}
      className={`${className}__Content`}
      isOpen
      onRequestClose={onClose}
      overlayClassName={`${className}__Backdrop`}
      portalClassName={className}
      role={role}
      shouldCloseOnOverlayClick={false}
      {...props}
    />
  );
}

ModalImpl.propTypes = {
  className: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  role: PropTypes.string,
};

ModalImpl.defaultProps = {
  role: "dialog",
};
