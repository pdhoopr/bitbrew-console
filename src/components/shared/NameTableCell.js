import PropTypes from "prop-types";
import React from "react";
import { Link, TableCell } from "../../design-system";
import resourceTypes from "./resourceTypes";

export default function NameTableCell({ resource }) {
  const name = resource.codename || resource.name;
  return (
    <TableCell gray={!name}>
      <Link to={resource.id}>
        {name || `Unnamed ${resource.impl}`}
        {resource.enabled === false && " (disabled)"}
      </Link>
    </TableCell>
  );
}

NameTableCell.propTypes = {
  resource: PropTypes.shape({
    codename: PropTypes.string,
    enabled: PropTypes.bool,
    id: PropTypes.string.isRequired,
    impl: PropTypes.oneOf(Object.values(resourceTypes)).isRequired,
    name: PropTypes.string,
  }).isRequired,
};
