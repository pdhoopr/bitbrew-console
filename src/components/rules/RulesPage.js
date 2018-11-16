import PropTypes from "prop-types";
import React, { useState } from "react";
import { listRules } from "../../api";
import { capitalize, localize } from "../../utils";
import useLoading from "../hooks/useLoading";
import AppBar from "../ui/AppBar";
import { PageHeader } from "../ui/Headers";
import Table, { Cell, Row } from "../ui/Table";
import { PageHeading } from "../ui/Texts";
import { Width640 } from "../ui/Widths";

export default function RulesPage({ projectId }) {
  const [rules, setRules] = useState([]);

  async function loadRules() {
    const { items } = await listRules(projectId);
    setRules(items);
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
            columns={["Name", "Created On", "Destination Type"]}
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
