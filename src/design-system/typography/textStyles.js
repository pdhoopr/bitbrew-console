import { css } from "styled-components";

export default css`
  color: ${({ gray }) => gray && "var(--color-dark-gray)"};
  font-weight: ${({ as }) =>
    as === "strong" ? "var(--weight-bold)" : "var(--weight-regular)"};
  letter-spacing: ${({ as }) => as === "strong" && "var(--letter-spacing)"};
  margin-bottom: 0;
  margin-top: 0;
`;
