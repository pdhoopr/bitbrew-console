import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import { viewDestination } from "../../api";
import { List, ListItem } from "../../design-system";
import { capitalize } from "../../utils";
import GlobalContext from "../GlobalContext";
import resourceTypes from "../shared/resourceTypes";
import Section from "../shared/Section";
import useLoading from "../shared/useLoading";
import ViewPage from "../shared/ViewPage";
import DeleteDestinationDialog from "./DeleteDestinationDialog";
import UpdateDestinationForm from "./UpdateDestinationForm";

export default function ViewDestinationPage({ destinationId, navigate }) {
  const { openDialog, openDrawer } = useContext(GlobalContext);

  const [destination, setDestination] = useState({});

  async function loadDestination() {
    const data = await viewDestination(destinationId);
    setDestination(data);
  }

  const isLoading = useLoading(loadDestination, [destinationId]);

  const type = destination.type || "";
  const compareType = type.toUpperCase();
  return (
    <ViewPage
      isLoading={isLoading}
      resource={{
        impl: resourceTypes.destination,
        ...destination,
      }}
      onOpenForm={() => {
        openDrawer(
          <UpdateDestinationForm
            destination={destination}
            onUpdate={loadDestination}
          />,
        );
      }}
      onOpenDialog={() => {
        openDialog(
          <DeleteDestinationDialog
            destination={destination}
            onDelete={() => {
              navigate("../");
            }}
          />,
        );
      }}
    >
      <Section
        heading="Destination Settings"
        description="Details about your destination that are relevant to its type."
      >
        <List>
          <ListItem heading="Type">{capitalize(type)}</ListItem>
          {compareType === "AMQP" && (
            <>
              <ListItem heading="Username">{destination.amqpUser}</ListItem>
              <ListItem heading="Password">{destination.amqpPassword}</ListItem>
              <ListItem heading="Host">{destination.amqpHost}</ListItem>
              <ListItem heading="Virtual Host">
                {destination.amqpVhost}
              </ListItem>
              <ListItem heading="Port">
                {destination.amqpPort}
                {destination.amqpSecure && " (uses TLS)"}
              </ListItem>
              <ListItem heading="Routing Key">
                {destination.amqpDefaultRoutingKey}
              </ListItem>
              <ListItem heading="Query String">
                {destination.amqpQuery}
              </ListItem>
            </>
          )}
          {compareType === "KEEN" && (
            <>
              <ListItem heading="Project ID">
                {destination.keenProjectId}
              </ListItem>
              <ListItem heading="Write Key">
                {destination.keenWriteKey}
              </ListItem>
              <ListItem heading="Event Collection">
                {destination.keenStreamName}
              </ListItem>
            </>
          )}
        </List>
      </Section>
    </ViewPage>
  );
}

ViewDestinationPage.propTypes = {
  destinationId: PropTypes.string,
  navigate: PropTypes.func,
};

ViewDestinationPage.defaultProps = {
  destinationId: null,
  navigate: null,
};