import { Location } from "@reach/router";
import React from "react";
import AlertDialog from "./AlertDialog";

export default function Http403Dialog() {
  return (
    <Location>
      {({ navigate }) => (
        <AlertDialog
          heading="Insufficient Permissions"
          confirmAction="OK"
          onConfirm={() => {
            navigate("/");
          }}
        >
          You don&apos;t have permission to view this page. We&apos;ll redirect
          you to the home page.
        </AlertDialog>
      )}
    </Location>
  );
}
