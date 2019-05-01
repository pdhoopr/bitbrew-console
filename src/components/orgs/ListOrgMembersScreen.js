import PropTypes from "prop-types";
import React from "react";
import { listOrgMembers } from "../../api";
import { TableCell, TableRow } from "../../design-system";
import { capitalize } from "../../utils";
import ListScreen from "../shared/ListScreen";
import PaginatedTable from "../shared/PaginatedTable";
import { orgMemberType } from "../shared/resourceTypes";
import usePagination from "../shared/usePagination";
import useResource from "../shared/useResource";

export default function ListOrgMembersScreen({ orgId }) {
  const [members, setMembers] = useResource(orgMemberType, []);

  async function loadMembers(params) {
    const { items, ...pageData } = await listOrgMembers(orgId, params);
    setMembers(items);
    return pageData;
  }

  const pagination = usePagination(loadMembers, [orgId]);

  return (
    <ListScreen showContent={pagination.isReady} resourceType={orgMemberType}>
      <PaginatedTable
        resourceType={orgMemberType}
        headings={["Name", "Email", "Role"]}
        pagination={pagination}
      >
        {members.map(member => (
          <TableRow key={member.id}>
            <TableCell>{member.name}</TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>{capitalize(member.role)}</TableCell>
          </TableRow>
        ))}
      </PaginatedTable>
    </ListScreen>
  );
}

ListOrgMembersScreen.propTypes = {
  orgId: PropTypes.string,
};

ListOrgMembersScreen.defaultProps = {
  orgId: null,
};
