import { Link as ReachLink } from "@reach/router";
import PropTypes from "prop-types";
import React from "react";
import styled, { css } from "styled-components";

const LinkImpl = ({ green, to, ...props }) =>
  /^\/(?!\/)/.test(to) ? (
    <ReachLink to={to} {...props} />
  ) : (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a href={to} rel="noopener noreferrer" target="_blank" {...props} />
  );

LinkImpl.propTypes = {
  green: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

LinkImpl.defaultProps = {
  green: false,
};

const baseStyles = css`
  color: inherit;
  cursor: pointer;
  text-decoration: none;
`;

export const Link = styled(LinkImpl)`
  ${baseStyles};
  border-bottom: 1px solid transparent;
  color: ${({ green }) => (green ? "var(--color-green)" : "inherit")};
  transition: border-bottom-color var(--duration-short),
    color var(--duration-short);

  &:hover,
  &:focus {
    border-bottom-color: currentColor;
    color: var(--color-green);
  }
`;

export const ButtonLink = styled(LinkImpl)`
  ${baseStyles};
  display: inline-block;
  padding: var(--size-8) var(--size-16);
  position: relative;

  &::before {
    background-color: currentColor;
    border-radius: var(--corner-radius);
    bottom: 0;
    content: "";
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

export const IconLink = styled(ButtonLink).attrs(({ title }) => ({
  "aria-label": title,
}))`
  padding-left: var(--size-8);
  padding-right: var(--size-8);

  &::before {
    border-radius: 50%;
  }
`;
