import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { Button } from "./Buttons";
import { FlexCenter } from "./Flexboxes";

const Wrapper = styled(Button)`
  color: var(--color-dark-gray);
  margin-top: var(--size-48);
  transition: color var(--duration-short);

  &:hover,
  &:focus {
    color: var(--color-red);
  }
`;

export default function DeleteButton({ children, onClick }) {
  return (
    <FlexCenter>
      <Wrapper onClick={onClick}>{children}</Wrapper>
    </FlexCenter>
  );
}

DeleteButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
