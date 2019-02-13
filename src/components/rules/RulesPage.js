import PropTypes from "prop-types";
import React, { useContext, useRef, useState } from "react";
import { listDestinations, listRules } from "../../api";
import { capitalize, localize } from "../../utils";
import GlobalContext from "../GlobalContext";
import useLoading from "../hooks/useLoading";
import { RaisedButton } from "../ui/Buttons";
import { FlexBetween } from "../ui/Flexboxes";
import { PageHeader } from "../ui/Headers";
import { Link } from "../ui/Links";
import Table, { Cell, Row } from "../ui/Table";
import { PageHeading } from "../ui/Texts";
import { Width800 } from "../ui/Widths";
import NewRuleForm from "./NewRuleForm";

export default function RulesPage({ orgId, projectId }) {
  const { openDrawer } = useContext(GlobalContext);

  const destinationsById = useRef({});

  const [rules, setRules] = useState([]);
  const [destinations, setDestinations] = useState([]);

  async function loadRules() {
    const [{ items }, { items: destinationItems }] = await Promise.all([
      listRules(projectId),
      listDestinations(projectId),
    ]);
    setRules(items);
    setDestinations(destinationItems);
    destinationsById.current = destinationItems.reduce(
      (byId, destination) => ({
        ...byId,
        [destination.id]: destination,
      }),
      {},
    );
  }

  const isLoading = useLoading(loadRules, [projectId]);

  const projectUrl = `/orgs/${orgId}/projects/${projectId}`;
  return (
    <main>
      <Width800>
        <PageHeader>
          <FlexBetween>
            <PageHeading>Rules</PageHeading>
            <RaisedButton
              onClick={() => {
                openDrawer(
                  <NewRuleForm
                    project={projectId}
                    selectDestinationFrom={destinations}
                    onCreate={loadRules}
                  />,
                );
              }}
            >
              New
            </RaisedButton>
          </FlexBetween>
        </PageHeader>
        {!isLoading && (
          <Table
            columns={["Name", "Created On", "Destination", "Destination Type"]}
            emptyState="There are no rules in this project yet."
          >
            {rules.map(rule => {
              const name = rule.name.trim();
              const destination = destinationsById.current[rule.destinationId];
              return (
                <Row key={rule.id} italic={!rule.enabled}>
                  <Cell gray={!name}>
                    <Link to={`${projectUrl}/rules/${rule.id}`}>
                      {name || "Unnamed rule"}
                      {!rule.enabled && " (disabled)"}
                    </Link>
                  </Cell>
                  <Cell>{localize(rule.createdAt)}</Cell>
                  <Cell gray={!destination}>
                    {destination ? (
                      <Link to={`${projectUrl}/destinations/${destination.id}`}>
                        {destination.name}
                      </Link>
                    ) : (
                      "Not found"
                    )}
                  </Cell>
                  <Cell gray={!destination}>
                    {destination ? capitalize(destination.type) : "N/A"}
                  </Cell>
                </Row>
              );
            })}
          </Table>
        )}
      </Width800>
    </main>
  );
}

RulesPage.propTypes = {
  orgId: PropTypes.string,
  projectId: PropTypes.string,
};

RulesPage.defaultProps = {
  orgId: null,
  projectId: null,
};
