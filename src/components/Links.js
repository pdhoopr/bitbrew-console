import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { RaisedButton } from './Buttons';

const AppLink = ({ to, ...props }) => {
  const isInternal = /^\/(?!\/)/.test(to);
  return isInternal ? (
    <RouterLink to={to} {...props} />
  ) : (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a href={to} rel="noopener noreferrer" target="_blank" {...props} />
  );
};

AppLink.propTypes = {
  to: PropTypes.string.isRequired,
};

export const baseStyles = css`
  cursor: pointer;
  text-decoration: none;
`;

export const Link = styled(AppLink)`
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

export const RaisedLink = styled(RaisedButton.withComponent(AppLink))`
  ${baseStyles};
`;
