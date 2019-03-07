import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import BlockLink from "../links/BlockLink";

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

    &:hover {
      border-bottom-color: transparent;
    }
  }

  &[data-current] {
    cursor: default;

    &:hover {
      border-bottom-color: currentColor;
    }

    &::before {
      content: none;
    }
  }
`;

export default function NavLink({ children, isActiveOnNestedRoutes, to }) {
  return (
    <Wrapper
      getProps={({ isCurrent, isPartiallyCurrent }) => {
        if (isCurrent) {
          return {
            "data-active": "",
            "data-current": "",
          };
        }
        if (isPartiallyCurrent && isActiveOnNestedRoutes) {
          return {
            "data-active": "",
          };
        }
        return null;
      }}
      to={to}
    >
      {children}
    </Wrapper>
  );
}

NavLink.propTypes = {
  children: PropTypes.node.isRequired,
  isActiveOnNestedRoutes: PropTypes.bool,
  to: PropTypes.string.isRequired,
};

NavLink.defaultProps = {
  isActiveOnNestedRoutes: false,
};
