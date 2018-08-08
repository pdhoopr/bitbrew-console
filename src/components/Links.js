import { Link as RouterLink } from '@reach/router';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { css } from 'styled-components';

function LinkImpl({ to, ...props }) {
  const isInternal = /^\/(?!\/)/.test(to);
  return isInternal ? (
    <RouterLink to={to} {...props} />
  ) : (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a href={to} rel="noopener noreferrer" target="_blank" {...props} />
  );
}

LinkImpl.propTypes = {
  to: PropTypes.string.isRequired,
};

const ReactiveLink = observer(LinkImpl);

const baseStyles = css`
  color: inherit;
  cursor: pointer;
  text-decoration: none;
`;

export const Link = styled(ReactiveLink)`
  ${baseStyles};
  border-bottom: 1px solid transparent;
  transition: border-bottom-color var(--duration-short),
    color var(--duration-short);

  &:hover,
  &:focus {
    border-bottom-color: currentColor;
    color: var(--color-green);
  }
`;

export const IconLink = styled(ReactiveLink).attrs({
  'aria-label': ({ title }) => title,
})`
  ${baseStyles};
  padding: var(--size-8);
  position: relative;

  &::before {
    background-color: currentColor;
    border-radius: 50%;
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity var(--duration-short);
  }

  &:hover::before,
  &:focus::before {
    opacity: 0.08;
  }
`;
