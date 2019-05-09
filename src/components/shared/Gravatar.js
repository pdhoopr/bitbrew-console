import md5 from "md5";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.img`
  border-radius: 50%;
  vertical-align: middle;
`;

export default function Gravatar({ email, name, size }) {
  const hash = md5(email);
  const retinaSize = size * 2;
  return (
    <Wrapper
      src={`https://www.gravatar.com/avatar/${hash}?s=${retinaSize}&d=identicon`}
      alt={name}
      height={size}
      width={size}
    />
  );
}

Gravatar.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string,
  size: PropTypes.number,
};

Gravatar.defaultProps = {
  name: "",
  size: 32,
};
