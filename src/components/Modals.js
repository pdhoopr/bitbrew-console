import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import styled, { css } from 'styled-components';

function ModalImpl({ className, role, ...props }) {
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

ModalImpl.propTypes = {
  className: PropTypes.string.isRequired,
  role: PropTypes.string,
};

ModalImpl.defaultProps = {
  role: 'dialog',
};

const ReactiveModal = observer(ModalImpl);

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
    z-index: 3;
  }
`;

export const Dialog = styled(ReactiveModal).attrs({
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

export const Drawer = styled(ReactiveModal)`
  ${baseStyles};

  &__Content {
    background: var(--color-blue-gray);
  }

  &__Overlay {
    justify-content: flex-end;
  }
`;
