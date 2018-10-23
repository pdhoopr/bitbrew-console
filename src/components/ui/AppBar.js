import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { connect } from '../../utils/helpers';
import { Button } from './Buttons';
import { FlexBetween } from './Flexboxes';
import { ArrowDownIcon } from './Icons';
import Menu from './Menu';

const ControlButton = styled(Button)`
  text-transform: none;
`;

const ControlIcon = styled(ArrowDownIcon)`
  fill: currentColor;
  height: var(--size-16);
  margin-right: calc(-1 * var(--size-4));
  width: var(--size-16);
`;

function AppBar({ children, signOut, user }) {
  return (
    <FlexBetween>
      {children}
      <Menu
        control={
          <ControlButton>
            {user.email} <ControlIcon aria-hidden />
          </ControlButton>
        }
      >
        <Button onClick={signOut}>Sign out</Button>
      </Menu>
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
  ({ userStore }) => ({
    signOut: userStore.signOut,
    user: userStore.user,
  }),
);
