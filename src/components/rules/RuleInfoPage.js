import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { viewDestination, viewRule } from "../../api";
import { capitalize, localize } from "../../utils";
import GlobalContext from "../GlobalContext";
import useLoading from "../hooks/useLoading";
import BackLink from "../ui/BackLink";
import DeleteButton from "../ui/DeleteButton";
import { PageHeader } from "../ui/Headers";
import { SyncDisabledIcon, SyncIcon } from "../ui/Icons";
import { Link } from "../ui/Links";
import List from "../ui/List";
import { Content, Section } from "../ui/Sections";
import { PageHeading, SectionHeading, SubHeading } from "../ui/Texts";
import { Width800 } from "../ui/Widths";
import DeleteRuleDialog from "./DeleteRuleDialog";

const Code = styled.pre`
  font-family: var(--font-system-monospace);
  font-size: var(--size-12);
  line-height: var(--size-16);
  margin-bottom: 0;
  margin-top: 0;
  overflow: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const NotFound = styled.span`
  color: var(--color-dark-gray);
`;

export default function RuleInfoPage({ navigate, orgId, projectId, ruleId }) {
  const { openDialog } = useContext(GlobalContext);

  const [rule, setRule] = useState({});
  const [destination, setDestination] = useState({});

  async function loadRule() {
    const data = await viewRule(ruleId);
    const destinationData =
      data.destinationType.toUpperCase() === "UNKNOWN"
        ? {}
        : await viewDestination(data.destinationId);
    setRule(data);
    setDestination(destinationData);
  }

  const isLoading = useLoading(loadRule, [ruleId]);

  const projectUrl = `/orgs/${orgId}/projects/${projectId}`;
  const rulesUrl = `${projectUrl}/rules`;
  const name = rule.name && rule.name.trim();
  return (
    <main>
      <Width800>
        <BackLink to={rulesUrl} title="View all rules in this project" />
        {!isLoading && (
          <React.Fragment>
            <PageHeader>
              <PageHeading gray={!name}>{name || "Unnamed rule"}</PageHeading>
            </PageHeader>
            <Section>
              <SectionHeading>Overview</SectionHeading>
              <Content>
                <List
                  items={[
                    ["ID", rule.id],
                    [
                      "Enabled",
                      rule.enabled ? (
                        <span
                          title="This rule is enabled"
                          aria-label="This rule is enabled"
                        >
                          <SyncIcon />
                        </span>
                      ) : (
                        <span
                          title="This rule is disabled"
                          aria-label="This rule is disabled"
                        >
                          <SyncDisabledIcon />
                        </span>
                      ),
                    ],
                    [
                      "Created On",
                      localize(rule.createdAt, {
                        time: true,
                      }),
                    ],
                    [
                      "Last Modified On",
                      localize(rule.updatedAt, {
                        time: true,
                      }),
                    ],
                  ]}
                />
              </Content>
            </Section>
            <Section>
              <SectionHeading>Rule Settings</SectionHeading>
              <SubHeading gray>
                Details about your rule, such as the records it&apos;s capturing
                and any transformations.
              </SubHeading>
              <Content>
                <List
                  items={[
                    ["Trigger When", <Code>{rule.triggerRuleWhen}</Code>],
                    [
                      "Data Transformation",
                      <Code>{rule.dataTransformation}</Code>,
                    ],
                  ]}
                />
              </Content>
            </Section>
            <Section>
              <SectionHeading>Destination Settings</SectionHeading>
              <SubHeading gray>
                Details about the destination this rule outputs to.
              </SubHeading>
              <Content>
                <List
                  items={[
                    [
                      "Destination",
                      destination.id ? (
                        <Link
                          to={`${projectUrl}/destinations/${destination.id}`}
                          green
                        >
                          {destination.name}
                        </Link>
                      ) : (
                        <NotFound>Not found</NotFound>
                      ),
                    ],
                    [
                      "Destination Type",
                      destination.type ? (
                        capitalize(destination.type)
                      ) : (
                        <NotFound>N/A</NotFound>
                      ),
                    ],
                  ]}
                />
              </Content>
            </Section>
            <DeleteButton
              onClick={() => {
                openDialog(
                  <DeleteRuleDialog
                    rule={rule}
                    onDelete={() => {
                      navigate(rulesUrl);
                    }}
                  />,
                );
              }}
            >
              Delete this rule
            </DeleteButton>
          </React.Fragment>
        )}
      </Width800>
    </main>
  );
}

RuleInfoPage.propTypes = {
  navigate: PropTypes.func,
  orgId: PropTypes.string,
  projectId: PropTypes.string,
  ruleId: PropTypes.string,
};

RuleInfoPage.defaultProps = {
  navigate: null,
  orgId: null,
  projectId: null,
  ruleId: null,
};
