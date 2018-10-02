import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { connect } from '../utils/tools';
import { Button } from './Buttons';
import { FlexBetween } from './Flexboxes';
import { DropdownIcon } from './Icons';
import Dropdown from './Dropdown';

const Trigger = styled(Button)`
  text-transform: none;
`;

const Icon = styled(DropdownIcon)`
  fill: currentColor;
  height: var(--size-16);
  margin-right: calc(-1 * var(--size-4));
  width: var(--size-16);
`;

function AppBar({ children, signOut, user }) {
  return (
    <FlexBetween>
      {children}
      <Dropdown
        triggerButton={
          <Trigger>
            {user.email} <Icon aria-hidden />
          </Trigger>
        }
      >
        <Button onClick={signOut}>Sign out</Button>
      </Dropdown>
    </FlexBetween>
  );
}

AppBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  signOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  AppBar,
  ({ authStore }) => ({
    signOut: authStore.signOut,
    user: authStore.user,
  }),
);
