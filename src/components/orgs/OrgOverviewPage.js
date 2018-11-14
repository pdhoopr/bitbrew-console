import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { viewOrg } from "../../api";
import { localize } from "../../utils";
import Context from "../Context";
import useLoading from "../hooks/useLoading";
import AppBar from "../ui/AppBar";
import { RaisedButton } from "../ui/Buttons";
import { FlexBetween } from "../ui/Flexboxes";
import { PageHeader } from "../ui/Headers";
import List from "../ui/List";
import { Content, Section } from "../ui/Sections";
import { PageHeading, SectionHeading } from "../ui/Texts";
import { Width640 } from "../ui/Widths";
import DeleteOrgDialog from "./DeleteOrgDialog";
import EditOrgForm from "./EditOrgForm";

const EditOrgButton = styled(RaisedButton)`
  background-color: var(--color-black);
  margin-left: auto;
  margin-right: var(--size-16);
`;

export default function OrgOverviewPage({ orgId }) {
  const { openDialog, openDrawer } = useContext(Context);

  const [org, setOrg] = useState({});

  async function loadOrg() {
    const data = await viewOrg(orgId);
    setOrg(data);
  }

  const isLoading = useLoading(loadOrg, [orgId]);

  return (
    <main>
      <PageHeader>
        <AppBar>
          <PageHeading>{org.name || <span>&nbsp;</span>}</PageHeading>
        </AppBar>
      </PageHeader>
      {!isLoading && (
        <Width640>
          <Section>
            <FlexBetween>
              <SectionHeading>Overview</SectionHeading>
              <EditOrgButton
                onClick={() => {
                  openDrawer(<EditOrgForm org={org} onUpdate={loadOrg} />);
                }}
              >
                Edit
              </EditOrgButton>
              <RaisedButton
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
                red
              >
                Delete
              </RaisedButton>
            </FlexBetween>
            <Content>
              <List
                items={[
                  ["ID", org.id],
                  ["Date Created", localize(org.createdAt)],
                ]}
              />
            </Content>
          </Section>
        </Width640>
      )}
    </main>
  );
}

OrgOverviewPage.propTypes = {
  orgId: PropTypes.string,
};

OrgOverviewPage.defaultProps = {
  orgId: null,
};
