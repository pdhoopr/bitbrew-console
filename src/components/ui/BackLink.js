import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { BackIcon } from "./Icons";
import { IconLink } from "./Links";

const Wrapper = styled(IconLink)`
  left: calc(-1 * var(--size-60));
  position: absolute;
  top: var(--size-34);
`;

export default function BackLink({ title, to }) {
  return (
    <Wrapper to={to} title={title}>
      <BackIcon />
    </Wrapper>
  );
}

BackLink.propTypes = {
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
