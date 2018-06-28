import { Link as RouterLink } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from './Buttons';

function LinkImpl({ red, to, ...props }) {
  const isInternal = /^\/(?!\/)/.test(to);
  return isInternal ? (
    <RouterLink to={to} {...props} />
  ) : (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a href={to} rel="noopener noreferrer" target="_blank" {...props} />
  );
}

LinkImpl.propTypes = {
  red: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

LinkImpl.defaultProps = {
  red: false,
};

const baseStyles = css`
  cursor: pointer;
  text-decoration: none;
`;

export const Link = styled(LinkImpl)`
  ${baseStyles};
  border-bottom: 1px solid transparent;
  color: inherit;
  transition: border-bottom-color var(--duration-short),
    color var(--duration-short);

  &:hover {
    border-bottom-color: currentColor;
    color: var(--color-green);
  }
`;

export const IconLink = styled(Button.withComponent(LinkImpl)).attrs({
  'aria-label': ({ title }) => title,
})`
  ${baseStyles};

  &::before {
    border-radius: 50%;
  }
`;