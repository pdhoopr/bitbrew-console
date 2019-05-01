import PropTypes from "prop-types";
import React, { useContext } from "react";
import { listDestinations, listRules } from "../../api";
import { Link, TableCell, TableRow } from "../../design-system";
import { capitalize, localize } from "../../utils";
import AppContext from "../AppContext";
import ListScreen from "../shared/ListScreen";
import NameTableCell from "../shared/NameTableCell";
import PaginatedTable from "../shared/PaginatedTable";
import { destinationType, ruleType } from "../shared/resourceTypes";
import usePagination from "../shared/usePagination";
import useResource from "../shared/useResource";
import CreateRuleForm from "./CreateRuleForm";

export default function ListRulesScreen({ projectId }) {
  const { openDrawer } = useContext(AppContext);

  const [rules, setRules] = useResource(ruleType, []);
  const [destinations, setDestinations] = useResource(destinationType, []);

  async function loadRules(params) {
    const [
      { items, ...pageData },
      { items: destinationItems },
    ] = await Promise.all([
      listRules(projectId, params),
      listDestinations(projectId),
    ]);
    setRules(items);
    setDestinations(destinationItems);
    return pageData;
  }

  const pagination = usePagination(loadRules, [projectId]);

  return (
    <ListScreen
      showContent={pagination.isReady}
      resourceType={ruleType}
      onOpenCreate={() => {
        openDrawer(
          <CreateRuleForm
            projectId={projectId}
            selectDestinationFrom={destinations}
            onCreate={pagination.loadFirstPage}
          />,
        );
      }}
    >
      {pagination.hasItems && (
        <PaginatedTable
          resourceType={ruleType}
          headings={["Name", "Created On", "Destination", "Destination Type"]}
          pagination={pagination}
        >
          {rules.map(rule => {
            const ruleDestination = destinations.find(
              destination => destination.id === rule.destinationId,
            );
            return (
              <TableRow key={rule.id} italic={!rule.enabled}>
                <NameTableCell resource={rule} />
                <TableCell>{localize(rule.createdAt)}</TableCell>
                <TableCell gray={!ruleDestination}>
                  {ruleDestination ? (
                    <Link to={`../destinations/${ruleDestination.id}`}>
                      {ruleDestination.name}
                    </Link>
                  ) : (
                    "Not found"
                  )}
                </TableCell>
                <TableCell gray={!ruleDestination}>
                  {ruleDestination ? capitalize(ruleDestination.type) : "N/A"}
                </TableCell>
              </TableRow>
            );
          })}
        </PaginatedTable>
      )}
    </ListScreen>
  );
}

ListRulesScreen.propTypes = {
  projectId: PropTypes.string,
};

ListRulesScreen.defaultProps = {
  projectId: null,
};
