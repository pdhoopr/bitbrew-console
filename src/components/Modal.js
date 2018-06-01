import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';

function AppModal({ className, ...props }) {
  return (
    <ReactModal
      bodyOpenClassName={`${className}__Body--open`}
      className={`${className}__Content`}
      overlayClassName={`${className}__Overlay`}
      portalClassName={className}
      {...props}
    />
  );
}

AppModal.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(AppModal)`
  &__Body--open {
    overflow: hidden;
  }

  &__Content {
    background: var(--color-blue-gray);
    box-shadow: var(--elevation-high);
    bottom: 0;
    max-width: var(--size-480);
    outline: none;
    overflow: auto;
    padding: var(--size-32) var(--size-24);
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    z-index: 3;
  }

  &__Overlay {
    background-color: rgba(0, 0, 0, 0.48);
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 2;
  }
`;
