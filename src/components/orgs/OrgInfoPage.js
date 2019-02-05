import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { listOrgMembers } from "../../api";
import { capitalize, localize } from "../../utils";
import GlobalContext from "../GlobalContext";
import useLoading from "../hooks/useLoading";
import BackLink from "../ui/BackLink";
import { RaisedButton } from "../ui/Buttons";
import DeleteButton from "../ui/DeleteButton";
import { FlexBetween } from "../ui/Flexboxes";
import { PageHeader } from "../ui/Headers";
import List from "../ui/List";
import { Content, Section } from "../ui/Sections";
import Table, { Cell, Row } from "../ui/Table";
import { PageHeading, SectionHeading } from "../ui/Texts";
import { Width640 } from "../ui/Widths";
import DeleteOrgDialog from "./DeleteOrgDialog";
import EditOrgForm from "./EditOrgForm";
import OrgContext from "./OrgContext";

const MembersHeading = styled(SectionHeading)`
  margin-bottom: var(--size-16);
`;

export default function OrgInfoPage({ navigate, orgId }) {
  const { openDialog, openDrawer } = useContext(GlobalContext);
  const { loadOrg, org, orgIsLoading } = useContext(OrgContext);

  const [members, setMembers] = useState([]);

  async function loadMembers() {
    const { items } = await listOrgMembers(orgId);
    setMembers(items);
  }

  const membersAreLoading = useLoading(loadMembers, [orgId]);

  return (
    <main>
      <Width640>
        <BackLink to="/" title="Back to all organizations" />
        {!orgIsLoading && !membersAreLoading && (
          <React.Fragment>
            <PageHeader>
              <FlexBetween>
                <PageHeading>{org.name || <span>&nbsp;</span>}</PageHeading>
                <RaisedButton
                  onClick={() => {
                    openDrawer(<EditOrgForm org={org} onUpdate={loadOrg} />);
                  }}
                >
                  Edit
                </RaisedButton>
              </FlexBetween>
            </PageHeader>
            <Section>
              <SectionHeading>Overview</SectionHeading>
              <Content>
                <List
                  items={[
                    ["ID", org.id],
                    ["Created On", localize(org.createdAt)],
                  ]}
                />
              </Content>
            </Section>
            <Section>
              <MembersHeading>Members</MembersHeading>
              <Table columns={["Name", "Email", "Role"]}>
                {members.map(member => (
                  <Row key={member.id}>
                    <Cell>{member.name}</Cell>
                    <Cell>{member.email}</Cell>
                    <Cell>{capitalize(member.role)}</Cell>
                  </Row>
                ))}
              </Table>
            </Section>
            <DeleteButton
              onClick={() => {
                openDialog(
                  <DeleteOrgDialog
                    org={org}
                    onDelete={() => {
                      navigate("/");
                    }}
                  />,
                );
              }}
            >
              Delete this organization
            </DeleteButton>
          </React.Fragment>
        )}
      </Width640>
    </main>
  );
}

OrgInfoPage.propTypes = {
  navigate: PropTypes.func,
  orgId: PropTypes.string,
};

OrgInfoPage.defaultProps = {
  navigate: null,
  orgId: null,
};
