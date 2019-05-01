import { Location } from "@reach/router";
import React, { useContext } from "react";
import AppContext from "../AppContext";
import AlertDialog from "./AlertDialog";

export default function Http404Dialog() {
  const { closeDialog } = useContext(AppContext);

  return (
    <Location>
      {({ navigate }) => (
        <AlertDialog
          heading="Not Found"
          closeAction="Stay here"
          onClose={closeDialog}
          confirmAction="Let's go"
          onConfirm={() => {
            navigate("/");
          }}
        >
          This page could not be found. You can stay here, or we can redirect
          you to the home page.
        </AlertDialog>
      )}
    </Location>
  );
}
