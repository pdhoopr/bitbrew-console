import { Match } from "@reach/router";
import React, { useContext, useEffect } from "react";
import AppContext from "../AppContext";
import Header from "./Header";
import Http404Dialog from "./Http404Dialog";

export default function ScreenNotFound() {
  const { openDialog } = useContext(AppContext);

  useEffect(() => {
    openDialog(<Http404Dialog />);
  }, []);

  return (
    <Match path="/orgs/:orgId/*">{({ match }) => !match && <Header />}</Match>
  );
}
