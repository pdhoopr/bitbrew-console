import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import { ButtonLink } from './Links';

const Wrapper = styled(ButtonLink)`
  font-size: var(--size-16);
  padding: var(--size-8) var(--size-24);
  width: 100%;

  &::before {
    background-color: var(--color-white);
    border-radius: 0;
  }

  &[data-active] {
    color: var(--color-green);
  }
`;

function NavLink(props) {
  return (
    <Wrapper
      getProps={({ isPartiallyCurrent }) =>
        isPartiallyCurrent ? { 'data-active': '' } : null
      }
      {...props}
    />
  );
}

export default observer(NavLink);
