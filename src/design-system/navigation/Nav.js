import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Links = styled.ul`
  display: flex;
  list-style-type: none;
  margin-bottom: 0;
  margin-top: 0;
  padding-left: 0;
`;

export default function Nav({ children }) {
  return (
    <nav>
      <Links>
        {React.Children.map(children, navLink => (
          <li>{navLink}</li>
        ))}
      </Links>
    </nav>
  );
}

Nav.propTypes = {
  children: PropTypes.node.isRequired,
};
