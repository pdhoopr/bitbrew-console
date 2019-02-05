import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { IconLink } from "./Links";

const Wrapper = styled(IconLink)`
  border-bottom: var(--border-transparent);
  border-bottom-width: var(--size-2);
  font-weight: var(--weight-bold);
  letter-spacing: var(--letter-spacing);
  padding-bottom: var(--size-6);
  padding-left: var(--size-24);
  padding-right: var(--size-24);
  transition: border-bottom-color var(--duration-short),
    color var(--duration-short);
  width: 100%;

  &::before {
    border-radius: var(--corner-radius);
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

export default function NavLink({ exact, ...props }) {
  return (
    <Wrapper
      getProps={({ isCurrent, isPartiallyCurrent }) => {
        if (isCurrent) {
          return {
            "data-active": "",
            "data-current": "",
          };
        }
        if (isPartiallyCurrent && !exact) {
          return {
            "data-active": "",
          };
        }
        return null;
      }}
      {...props}
    />
  );
}

NavLink.propTypes = {
  exact: PropTypes.bool,
};

NavLink.defaultProps = {
  exact: false,
};
