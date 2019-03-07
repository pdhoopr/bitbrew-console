import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { viewDestination, viewRule } from "../../api";
import { Link, List, ListItem } from "../../design-system";
import { capitalize } from "../../utils";
import GlobalContext from "../GlobalContext";
import resourceTypes from "../shared/resourceTypes";
import Section from "../shared/Section";
import useLoading from "../shared/useLoading";
import ViewPage from "../shared/ViewPage";
import DeleteRuleDialog from "./DeleteRuleDialog";

const Code = styled.pre`
  font-family: var(--font-system-monospace);
  font-size: var(--size-12);
  line-height: var(--size-16);
  margin-bottom: 0;
  margin-top: 0;
  white-space: pre-wrap;
`;

const NotFound = styled.span`
  color: var(--color-dark-gray);
`;

export default function ViewRulePage({ navigate, ruleId }) {
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

  return (
    <ViewPage
      isLoading={isLoading}
      resource={{
        impl: resourceTypes.rule,
        ...rule,
      }}
      onOpenDialog={() => {
        openDialog(
          <DeleteRuleDialog
            rule={rule}
            onDelete={() => {
              navigate("../");
            }}
          />,
        );
      }}
    >
      <Section
        heading="Rule Settings"
        description="Details about your rule, such as the records it's capturing and any transformations."
      >
        <List>
          <ListItem heading="Trigger When">
            <Code>{rule.triggerRuleWhen}</Code>
          </ListItem>
          <ListItem heading="Data Transformation">
            <Code>{rule.dataTransformation}</Code>
          </ListItem>
        </List>
      </Section>
      <Section
        heading="Destination Settings"
        description="Details about the destination this rule outputs to."
      >
        <List>
          <ListItem heading="Destination">
            {destination.id ? (
              <Link to={`../../destinations/${destination.id}`} green>
                {destination.name}
              </Link>
            ) : (
              <NotFound>Not found</NotFound>
            )}
          </ListItem>
          <ListItem heading="Destination Type">
            {destination.type ? (
              capitalize(destination.type)
            ) : (
              <NotFound>N/A</NotFound>
            )}
          </ListItem>
        </List>
      </Section>
    </ViewPage>
  );
}

ViewRulePage.propTypes = {
  navigate: PropTypes.func,
  ruleId: PropTypes.string,
};

ViewRulePage.defaultProps = {
  navigate: null,
  ruleId: null,
};
