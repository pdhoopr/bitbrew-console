import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import styled, { css } from 'styled-components';

const ModalImpl = ({ className, role, ...props }) => (
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

ModalImpl.propTypes = {
  className: PropTypes.string.isRequired,
  role: PropTypes.string,
};

ModalImpl.defaultProps = {
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

  &__Backdrop {
    background-color: rgba(0, 0, 0, 0.48);
    bottom: 0;
    display: flex;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  }
`;

export const Dialog = styled(ModalImpl).attrs({
  role: 'alertdialog',
})`
  ${baseStyles};

  &__Content {
    background: var(--color-white);
    border-radius: var(--corner-radius);
  }

  &__Backdrop {
    align-items: center;
    justify-content: center;
    z-index: 4;
  }
`;

export const Drawer = styled(ModalImpl)`
  ${baseStyles};

  &__Content {
    background: var(--color-blue-gray);
  }

  &__Backdrop {
    justify-content: flex-end;
    z-index: 3;
  }
`;