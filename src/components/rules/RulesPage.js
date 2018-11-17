import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { listDestinations, listRules } from "../../api";
import { capitalize, localize } from "../../utils";
import Context from "../Context";
import useLoading from "../hooks/useLoading";
import AppBar from "../ui/AppBar";
import { IconButton } from "../ui/Buttons";
import { PageHeader } from "../ui/Headers";
import { AddIcon } from "../ui/Icons";
import Table, { Cell, IconCell, Row } from "../ui/Table";
import { PageHeading } from "../ui/Texts";
import { Width640 } from "../ui/Widths";
import NewRuleForm from "./NewRuleForm";

export default function RulesPage({ projectId }) {
  const { openDrawer } = useContext(Context);

  const [rules, setRules] = useState([]);
  const [destinations, setDestinations] = useState([]);

  async function loadRules() {
    const [{ items }, { items: destinationItems }] = await Promise.all([
      listRules(projectId),
      listDestinations(projectId),
    ]);
    setRules(items);
    setDestinations(destinationItems);
  }

  const isLoading = useLoading(loadRules, [projectId]);

  return (
    <main>
      <PageHeader>
        <AppBar>
          <PageHeading>Rules</PageHeading>
        </AppBar>
      </PageHeader>
      {!isLoading && (
        <Width640>
          <Table
            columns={[
              "Name",
              "Created On",
              "Destination Type",
              <IconCell key="New Rule">
                <IconButton
                  onClick={() => {
                    openDrawer(
                      <NewRuleForm
                        project={projectId}
                        selectDestinationFrom={destinations}
                        onCreate={loadRules}
                      />,
                    );
                  }}
                  title="Open new rule form"
                >
                  <AddIcon />
                </IconButton>
              </IconCell>,
            ]}
            emptyState="There are no rules in this project yet."
          >
            {rules.map(rule => {
              const name = rule.name.trim();
              return (
                <Row key={rule.id} italic={!rule.enabled}>
                  <Cell gray={!name}>
                    {name || "Unnamed rule"}
                    {!rule.enabled && " (disabled)"}
                  </Cell>
                  <Cell>{localize(rule.createdAt)}</Cell>
                  <Cell>{capitalize(rule.destinationType)}</Cell>
                  <Cell />
                </Row>
              );
            })}
          </Table>
        </Width640>
      )}
    </main>
  );
}

RulesPage.propTypes = {
  projectId: PropTypes.string,
};

RulesPage.defaultProps = {
  projectId: null,
};
