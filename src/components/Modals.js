import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import styled, { css } from 'styled-components';

function AppModal({ className, role, ...props }) {
  return (
    <ReactModal
      aria={{
        modal: true,
      }}
      bodyOpenClassName={`${className}__Body--open`}
      className={`${className}__Content`}
      isOpen
      overlayClassName={`${className}__Overlay`}
      portalClassName={className}
      role={role}
      shouldCloseOnOverlayClick={false}
      {...props}
    />
  );
}

AppModal.propTypes = {
  className: PropTypes.string.isRequired,
  role: PropTypes.string,
};

AppModal.defaultProps = {
  role: 'dialog',
};

const baseStyles = css`
  &__Body--open {
    overflow: hidden;
  }

  &__Content {
    box-shadow: var(--elevation-high);
    max-width: var(--size-480);
    outline: none;
    overflow: auto;
    width: 100%;
  }

  &__Overlay {
    background-color: rgba(0, 0, 0, 0.48);
    bottom: 0;
    display: flex;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 2;
  }
`;

export const Dialog = styled(AppModal).attrs({
  role: 'alertdialog',
})`
  ${baseStyles};

  &__Content {
    background: var(--color-white);
  }

  &__Overlay {
    align-items: center;
    justify-content: center;
  }
`;

export const Drawer = styled(AppModal)`
  ${baseStyles};

  &__Content {
    background: var(--color-blue-gray);
  }

  &__Overlay {
    justify-content: flex-end;
  }
`;
