import PropTypes from "prop-types";
import React from "react";
import ReactModal from "react-modal";

export default function ModalImpl({ className, role, ...props }) {
  return (
    <ReactModal
      aria={{
        modal: true,
      }}
      bodyOpenClassName={`${className}__Body--open`}
      className={`${className}__Content`}
      isOpen
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
  role: PropTypes.string,
};

ModalImpl.defaultProps = {
  role: "dialog",
};
