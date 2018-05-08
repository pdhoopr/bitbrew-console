import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';
import Logotype from '../graphics/logotype.svg';
import Flex from '../styles/Flex';

const Element = styled.header`
  padding-bottom: var(--size-32);
  padding-top: var(--size-32);
`;

const Logo = styled(Logotype)`
  display: block;
  height: var(--size-40);
  width: auto;
`;

function Header() {
  return (
    <Element>
      <Flex>
        <Logo />
      </Flex>
    </Element>
  );
}

export default observer(Header);
