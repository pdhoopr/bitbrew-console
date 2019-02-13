import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { listOrgMembers, listProjects } from "../../api";
import { localize, pluralize } from "../../utils";
import GlobalContext from "../GlobalContext";
import useLoading from "../hooks/useLoading";
import BackLink from "../ui/BackLink";
import { RaisedButton } from "../ui/Buttons";
import { Card, CardLink } from "../ui/Cards";
import DeleteButton from "../ui/DeleteButton";
import { FlexBetween } from "../ui/Flexboxes";
import { PageHeader } from "../ui/Headers";
import List from "../ui/List";
import { Content, Section } from "../ui/Sections";
import { PageHeading, SectionHeading, SubHeading } from "../ui/Texts";
import { Width800 } from "../ui/Widths";
import DeleteOrgDialog from "./DeleteOrgDialog";
import EditOrgForm from "./EditOrgForm";
import OrgContext from "./OrgContext";

export default function OrgInfoPage({ navigate, orgId }) {
  const { openDialog, openDrawer } = useContext(GlobalContext);
  const { loadOrg, org, orgIsLoading } = useContext(OrgContext);

  const [numMembers, setNumMembers] = useState([]);
  const [numProjects, setNumProjects] = useState([]);

  async function loadMetrics() {
    const [
      { totalItems: totalMembers },
      { totalItems: totalProjects },
    ] = await Promise.all([listOrgMembers(orgId), listProjects(orgId)]);
    setNumMembers(totalMembers);
    setNumProjects(totalProjects);
  }

  const metricsAreLoading = useLoading(loadMetrics, [orgId]);

  const orgsUrl = "/";
  return (
    <main>
      <Width800>
        <BackLink to={orgsUrl} title="View all organizations" />
        {!orgIsLoading && !metricsAreLoading && (
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
              <FlexBetween gap>
                {[[numMembers, "member"], [numProjects, "project"]].map(
                  ([num, label]) => (
                    <Card key={label} as={SectionHeading}>
                      <CardLink to={`/orgs/${orgId}/${label}s`}>
                        {num}
                        <SubHeading as="p" gray>
                          {pluralize(label, num).replace(/^\d+\s/, "")}
                        </SubHeading>
                      </CardLink>
                    </Card>
                  ),
                )}
              </FlexBetween>
            </Section>
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
            <DeleteButton
              onClick={() => {
                openDialog(
                  <DeleteOrgDialog
                    org={org}
                    onDelete={() => {
                      navigate(orgsUrl);
                    }}
                  />,
                );
              }}
            >
              Delete this organization
            </DeleteButton>
          </React.Fragment>
        )}
      </Width800>
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
