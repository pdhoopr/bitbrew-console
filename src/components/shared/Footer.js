import React from "react";
import styled from "styled-components";
import { Link } from "../../design-system";

const Docs = styled.ul`
  align-items: center;
  color: var(--color-dark-gray);
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin-bottom: 0;
  margin-top: 0;
  padding: var(--size-96) var(--size-24) var(--size-32);
`;

const DocsLink = styled(Link)`
  margin-left: var(--size-24);
`;

export default function Footer() {
  return (
    <footer>
      <Docs>
        <li>&copy; 2019 BitBrew, Inc.</li>
        <li>
          <DocsLink to="https://help.bitbrew.com/" isExternal>
            Help
          </DocsLink>
        </li>
        <li>
          <DocsLink to="https://docs.hub.bitbrew.com/reference" isExternal>
            Reference
          </DocsLink>
        </li>
      </Docs>
    </footer>
  );
}
