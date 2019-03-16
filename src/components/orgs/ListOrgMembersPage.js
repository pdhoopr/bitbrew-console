import PropTypes from "prop-types";
import React from "react";
import { listOrgMembers } from "../../api";
import { Table, TableCell, TableRow } from "../../design-system";
import { capitalize } from "../../utils";
import ListPage from "../shared/ListPage";
import { orgMemberType } from "../shared/resourceTypes";
import useLoading from "../shared/useLoading";
import useResource from "../shared/useResource";

export default function ListOrgMembersPage({ orgId }) {
  const [members, setMembers] = useResource(orgMemberType, []);

  async function loadMembers() {
    const { items } = await listOrgMembers(orgId);
    setMembers(items);
  }

  const isLoading = useLoading(loadMembers, [orgId]);

  return (
    <ListPage isLoading={isLoading} resourceType={orgMemberType}>
      <Table headings={["Name", "Email", "Role"]}>
        {members.map(member => (
          <TableRow key={member.id}>
            <TableCell>{member.name}</TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>{capitalize(member.role)}</TableCell>
          </TableRow>
        ))}
      </Table>
    </ListPage>
  );
}

ListOrgMembersPage.propTypes = {
  orgId: PropTypes.string,
};

ListOrgMembersPage.defaultProps = {
  orgId: null,
};
