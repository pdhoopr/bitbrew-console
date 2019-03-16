import PropTypes from "prop-types";
import React, { useContext, useRef } from "react";
import { listDestinations, listRules } from "../../api";
import { Link, Table, TableCell, TableRow } from "../../design-system";
import { capitalize, localize } from "../../utils";
import AppContext from "../AppContext";
import ListPage from "../shared/ListPage";
import NameTableCell from "../shared/NameTableCell";
import { destinationType, ruleType } from "../shared/resourceTypes";
import useLoading from "../shared/useLoading";
import useResource from "../shared/useResource";
import CreateRuleForm from "./CreateRuleForm";

export default function ListRulesPage({ projectId }) {
  const { openDrawer } = useContext(AppContext);

  const destinationsById = useRef({});

  const [rules, setRules] = useResource(ruleType, []);
  const [destinations, setDestinations] = useResource(destinationType, []);

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

  return (
    <ListPage
      isLoading={isLoading}
      resourceType={ruleType}
      onOpenForm={() => {
        openDrawer(
          <CreateRuleForm
            projectId={projectId}
            selectDestinationFrom={destinations}
            onCreate={loadRules}
          />,
        );
      }}
    >
      {rules.length > 0 && (
        <Table
          headings={["Name", "Created On", "Destination", "Destination Type"]}
        >
          {rules.map(rule => {
            const destination = destinationsById.current[rule.destinationId];
            return (
              <TableRow key={rule.id} italic={!rule.enabled}>
                <NameTableCell resource={rule} />
                <TableCell>{localize(rule.createdAt)}</TableCell>
                <TableCell gray={!destination}>
                  {destination ? (
                    <Link to={`../destinations/${destination.id}`}>
                      {destination.name}
                    </Link>
                  ) : (
                    "Not found"
                  )}
                </TableCell>
                <TableCell gray={!destination}>
                  {destination ? capitalize(destination.type) : "N/A"}
                </TableCell>
              </TableRow>
            );
          })}
        </Table>
      )}
    </ListPage>
  );
}

ListRulesPage.propTypes = {
  projectId: PropTypes.string,
};

ListRulesPage.defaultProps = {
  projectId: null,
};
