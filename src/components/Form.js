import React from 'react';
import styled from 'styled-components';

function AppForm(props) {
  return <form noValidate {...props} />;
}

export default styled(AppForm)`
  background-color: var(--color-white);
  border-radius: var(--corner-radius);
  box-shadow: var(--elevation-low);
  margin-left: auto;
  margin-right: auto;
  max-width: var(--size-320);
  padding: var(--size-16) var(--size-24);
`;
