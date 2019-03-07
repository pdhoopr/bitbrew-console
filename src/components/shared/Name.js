import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import resourceTypes from "./resourceTypes";

const Unnamed = styled.span`
  color: var(--color-dark-gray);
`;

export default function Name({ className, resource }) {
  return (
    resource.codename ||
    resource.name || (
      <Unnamed className={className}>Unnamed {resource.impl}</Unnamed>
    )
  );
}

Name.propTypes = {
  className: PropTypes.string,
  resource: PropTypes.shape({
    codename: PropTypes.string,
    impl: PropTypes.oneOf(Object.values(resourceTypes)).isRequired,
    name: PropTypes.string,
  }).isRequired,
};

Name.defaultProps = {
  className: null,
};
