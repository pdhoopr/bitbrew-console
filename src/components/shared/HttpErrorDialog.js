import React, { useContext } from "react";
import AppContext from "../AppContext";
import AlertDialog from "./AlertDialog";

export default function HttpErrorDialog() {
  const { closeDialog } = useContext(AppContext);

  return (
    <AlertDialog
      heading="Unexpected Error"
      closeAction="Close"
      onClose={closeDialog}
      confirmAction="Reload"
      onConfirm={() => {
        window.location.reload(true);
      }}
    >
      Sorry, something went wrong. Try reloading the page, and contact us if the
      problem persists.
    </AlertDialog>
  );
}
