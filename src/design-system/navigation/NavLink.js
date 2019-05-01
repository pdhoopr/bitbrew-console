import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import BlockLink from "../links/BlockLink";
import getNavLinkProps from "./getNavLinkProps";

const Wrapper = styled(BlockLink)`
  border-bottom: var(--border-transparent);
  border-bottom-width: var(--size-2);
  font-weight: var(--weight-bold);
  letter-spacing: var(--letter-spacing);
  padding-bottom: var(--size-6);
  padding-top: var(--size-8);
  transition: border-bottom-color var(--effect-duration),
    color var(--effect-duration);

  &::before {
    bottom: calc(-1 * var(--size-2));
  }

  &[data-active] {
    border-bottom-color: currentColor;
    color: var(--color-green);

    &:hover,
    &:focus {
      border-bottom-color: transparent;
    }
  }

  &[data-current] {
    cursor: default;

    &:hover,
    &:focus {
      border-bottom-color: currentColor;
    }

    &::before {
      content: none;
    }
  }
`;

export default function NavLink({ children, isPartiallyActive, to }) {
  return (
    <Wrapper
      getProps={props => getNavLinkProps({ ...props, isPartiallyActive })}
      to={to}
    >
      {children}
    </Wrapper>
  );
}

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  isPartiallyActive: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

NavLink.defaultProps = {
  isPartiallyActive: false,
};
