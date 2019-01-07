import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { viewOrg } from "../../api";
import { localize } from "../../utils";
import Context from "../Context";
import useLoading from "../hooks/useLoading";
import AppBar from "../ui/AppBar";
import { RaisedButton } from "../ui/Buttons";
import DeleteButton from "../ui/DeleteButton";
import { FlexBetween } from "../ui/Flexboxes";
import { PageHeader } from "../ui/Headers";
import List from "../ui/List";
import { Content, Section } from "../ui/Sections";
import { PageHeading, SectionHeading } from "../ui/Texts";
import { Width640 } from "../ui/Widths";
import DeleteOrgDialog from "./DeleteOrgDialog";
import EditOrgForm from "./EditOrgForm";

export default function OrgOverviewPage({ navigate, orgId }) {
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
              <RaisedButton
                onClick={() => {
                  openDrawer(<EditOrgForm org={org} onUpdate={loadOrg} />);
                }}
              >
                Edit
              </RaisedButton>
            </FlexBetween>
            <Content>
              <List
                items={[
                  ["ID", org.id],
                  ["Created On", localize(org.createdAt)],
                ]}
              />
            </Content>
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
            Delete organization
          </DeleteButton>
        </Width640>
      )}
    </main>
  );
}

OrgOverviewPage.propTypes = {
  navigate: PropTypes.func,
  orgId: PropTypes.string,
};

OrgOverviewPage.defaultProps = {
  navigate: null,
  orgId: null,
};
