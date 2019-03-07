import PropTypes from "prop-types";
import React, { useContext, useRef, useState } from "react";
import { listDestinations, listRules } from "../../api";
import { Link, Table, TableCell, TableRow } from "../../design-system";
import { capitalize, localize } from "../../utils";
import GlobalContext from "../GlobalContext";
import ListPage from "../shared/ListPage";
import NameTableCell from "../shared/NameTableCell";
import resourceTypes from "../shared/resourceTypes";
import useLoading from "../shared/useLoading";
import CreateRuleForm from "./CreateRuleForm";

export default function ListRulesPage({ projectId }) {
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

  return (
    <ListPage
      isLoading={isLoading}
      resource={resourceTypes.rule}
      onOpenForm={() => {
        openDrawer(
          <CreateRuleForm
            project={projectId}
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
                <NameTableCell
                  resource={{
                    impl: resourceTypes.rule,
                    ...rule,
                  }}
                />
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
