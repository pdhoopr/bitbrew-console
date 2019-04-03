import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import TableCell from "./TableCell";

const Wrapper = styled.table`
  border-collapse: collapse;
  font-size: var(--size-14);
  line-height: var(--size-20);
  width: 100%;
`;

const Heading = styled(TableCell)`
  background-color: var(--color-white-gray);
  font-weight: var(--weight-bold);
  letter-spacing: var(--letter-spacing);
`;

export default function Table({ children, headings }) {
  return (
    <Wrapper>
      <thead>
        <tr>
          {headings.map(heading => (
            <Heading key={heading} as="th">
              {heading}
            </Heading>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </Wrapper>
  );
}

Table.propTypes = {
  children: PropTypes.node.isRequired,
  headings: PropTypes.arrayOf(PropTypes.string).isRequired,
};
