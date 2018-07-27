import { Link as RouterLink } from '@reach/router';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from './Buttons';

function LinkImpl({ green, to, ...props }) {
  const isInternal = /^\/(?!\/)/.test(to);
  return isInternal ? (
    <RouterLink to={to} {...props} />
  ) : (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a href={to} rel="noopener noreferrer" target="_blank" {...props} />
  );
}

LinkImpl.propTypes = {
  green: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

LinkImpl.defaultProps = {
  green: false,
};

const ReactiveLink = observer(LinkImpl);

const baseStyles = css`
  cursor: pointer;
  text-decoration: none;
`;

export const Link = styled(ReactiveLink)`
  ${baseStyles};
  border-bottom: 1px solid transparent;
  color: ${({ green }) => (green ? 'var(--color-green)' : 'inherit')};
  transition: border-bottom-color var(--duration-short),
    color var(--duration-short);

  &:hover,
  &:focus {
    border-bottom-color: currentColor;
    color: var(--color-green);
  }
`;

export const IconLink = styled(Button.withComponent(ReactiveLink)).attrs({
  'aria-label': ({ title }) => title,
  type: undefined,
})`
  ${baseStyles};

  &::before {
    border-radius: 50%;
  }
`;
