import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components";
import { viewRule } from "../../api";
import { capitalize, localize } from "../../utils";
import useLoading from "../hooks/useLoading";
import AppBar from "../ui/AppBar";
import { FlexBetween } from "../ui/Flexboxes";
import { PageHeader } from "../ui/Headers";
import { BackIcon, SyncDisabledIcon, SyncIcon } from "../ui/Icons";
import { IconLink } from "../ui/Links";
import List from "../ui/List";
import { Content, Section } from "../ui/Sections";
import { PageHeading, SectionHeading, SubHeading } from "../ui/Texts";
import { Width640 } from "../ui/Widths";

const Heading = styled(PageHeading)`
  margin-left: var(--size-16);
  margin-right: auto;
`;

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

export default function RuleOverviewPage({ orgId, projectId, ruleId }) {
  const [rule, setRule] = useState({});

  async function loadRule() {
    const data = await viewRule(ruleId);
    setRule(data);
  }

  const isLoading = useLoading(loadRule, [ruleId]);

  return (
    <main>
      <PageHeader>
        <AppBar>
          <IconLink
            to={`/orgs/${orgId}/projects/${projectId}/rules`}
            title="View all rules for this project"
          >
            <BackIcon />
          </IconLink>
          <Heading>{rule.name || <span>&nbsp;</span>}</Heading>
        </AppBar>
      </PageHeader>
      {!isLoading && (
        <Width640>
          <Section>
            <FlexBetween>
              <SectionHeading>Overview</SectionHeading>
            </FlexBetween>
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
              Additional details about your rule, such as the records it&apos;s
              capturing, any transformations, and the destination it outputs to.
            </SubHeading>
            <Content>
              <List
                items={[
                  ["Trigger When", <Code>{rule.triggerRuleWhen}</Code>],
                  [
                    "Data Transformation",
                    <Code>{rule.dataTransformation}</Code>,
                  ],
                  ["Destination Type", capitalize(rule.destinationType)],
                ]}
              />
            </Content>
          </Section>
        </Width640>
      )}
    </main>
  );
}

RuleOverviewPage.propTypes = {
  ruleId: PropTypes.string,
  orgId: PropTypes.string,
  projectId: PropTypes.string,
};

RuleOverviewPage.defaultProps = {
  ruleId: null,
  orgId: null,
  projectId: null,
};
