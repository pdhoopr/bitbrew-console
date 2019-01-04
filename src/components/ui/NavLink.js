import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { IconLink } from "./Links";

const Wrapper = styled(IconLink)`
  font-size: var(--size-16);
  line-height: var(--size-24);
  padding-left: var(--size-24);
  padding-right: var(--size-24);
  width: 100%;

  &::before {
    background-color: var(--color-white);
    border-radius: 0;
  }

  &[data-active] {
    color: var(--color-green);
  }
`;

export default function NavLink({ exact, ...props }) {
  return (
    <Wrapper
      getProps={({ isCurrent, isPartiallyCurrent }) =>
        (exact && isCurrent) || (!exact && isPartiallyCurrent)
          ? { "data-active": "" }
          : null
      }
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
