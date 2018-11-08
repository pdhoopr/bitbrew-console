import PropTypes from "prop-types";
import React, { useState } from "react";
import { listOrgMembers } from "../../api";
import { capitalize } from "../../utils";
import useLoading from "../hooks/useLoading";
import AppBar from "../ui/AppBar";
import { PageHeader } from "../ui/Headers";
import Table, { Cell, Row } from "../ui/Table";
import { PageTitle } from "../ui/Texts";
import { Width640 } from "../ui/Widths";

export default function OrgMembersPage({ orgId }) {
  const [members, setMembers] = useState([]);

  async function loadMembers() {
    const { items } = await listOrgMembers(orgId);
    setMembers(items);
  }

  const isLoading = useLoading(loadMembers, [orgId]);

  return (
    <main>
      <PageHeader>
        <AppBar>
          <PageTitle>Members</PageTitle>
        </AppBar>
      </PageHeader>
      {!isLoading && (
        <Width640>
          <Table columns={["Name", "Email", "Role"]}>
            {members.map(member => (
              <Row key={member.id}>
                <Cell>{member.name}</Cell>
                <Cell>{member.email}</Cell>
                <Cell>{capitalize(member.role)}</Cell>
              </Row>
            ))}
          </Table>
        </Width640>
      )}
    </main>
  );
}

OrgMembersPage.propTypes = {
  orgId: PropTypes.string,
};

OrgMembersPage.defaultProps = {
  orgId: null,
};
