import {
  createHistory,
  LocationProvider,
  navigate,
  Redirect,
  Router as ReachRouter,
} from "@reach/router";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { off, on, retry, setToken } from "../api";
import { GlobalStyle, Snackbar } from "../design-system";
import { silentRefresh, summarize } from "../utils";
import AppContext from "./AppContext";
import ListDestinationsScreen from "./destinations/ListDestinationsScreen";
import ViewDestinationScreen from "./destinations/ViewDestinationScreen";
import ListDevicesScreen from "./devices/ListDevicesScreen";
import ViewDeviceScreen from "./devices/ViewDeviceScreen";
import ListOrgMembersScreen from "./orgs/ListOrgMembersScreen";
import Org from "./orgs/Org";
import ViewOrgScreen from "./orgs/ViewOrgScreen";
import ListProjectsScreen from "./projects/ListProjectsScreen";
import Project from "./projects/Project";
import ViewProjectScreen from "./projects/ViewProjectScreen";
import ListRulesScreen from "./rules/ListRulesScreen";
import ViewRuleScreen from "./rules/ViewRuleScreen";
import Footer from "./shared/Footer";
import WelcomeScreen from "./WelcomeScreen";

const Router = styled(ReachRouter)`
  flex: 1;
`;

export default function App() {
  const history = useRef(createHistory(window));
  const snackbarElement = useRef(document.getElementById("alert-region"));

  const [auth, setAuth] = useState(null);
  const [drawer, setDrawer] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  function logInWithToken(token) {
    setToken(token);
    setAuth(token);
  }

  function logInWithRedirect() {
    const currentUrl = window.location.href;
    navigate(
      `https://service.bitbrew.com/auth/logout?redirect_uri=https://service.bitbrew.com/auth/login?redirect_uri=${currentUrl}`,
    );
  }

  async function logInWithSilentRefresh() {
    try {
      const token = await silentRefresh();
      logInWithToken(token);
    } catch {
      logInWithRedirect();
    }
  }

  function logInWithUrlParam() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");
    params.delete("access_token");
    const currentUrl = `${window.location.origin}${window.location.pathname}`;
    const queryWithoutToken = `?${params}`.replace(/\?$/, "");
    navigate(`${currentUrl}${queryWithoutToken}`, {
      replace: true,
    });
    if (document.referrer.startsWith("https://service.bitbrew.com")) {
      logInWithToken(token);
    } else {
      logInWithSilentRefresh();
    }
  }

  function logOut() {
    setToken(null);
    setAuth(null);
    const rootUrl = window.location.origin;
    navigate(
      `https://service.bitbrew.com/auth/logout?redirect_uri=https://service.bitbrew.com/auth/login?redirect_uri=${rootUrl}`,
    );
  }

  function openDrawer(component) {
    setDrawer(component);
  }

  function closeDrawer() {
    setDrawer(null);
  }

  function openDialog(component) {
    setDialog(component);
  }

  function closeDialog() {
    setDialog(null);
  }

  function openSnackbar(component) {
    setSnackbar(component);
  }

  function closeSnackbar() {
    setSnackbar(null);
  }

  async function errorBoundary(code) {
    try {
      await code();
      return null;
    } catch (error) {
      openSnackbar(
        <Snackbar
          containerElement={snackbarElement.current}
          infoLevel="error"
          onDismiss={closeSnackbar}
        >
          {summarize(error)}
        </Snackbar>,
      );
      return error;
    }
  }

  async function refreshAndRetryOn401(error) {
    if (error.response.status === 401) {
      await logInWithSilentRefresh();
      const response = await retry(error);
      return response;
    }
    throw error;
  }

  useEffect(() => {
    if (/[?&]access_token=/.test(window.location.search)) {
      logInWithUrlParam();
    } else {
      logInWithSilentRefresh();
    }
    on("error", refreshAndRetryOn401);
    return () => {
      off("error", refreshAndRetryOn401);
    };
  }, []);

  useEffect(
    () =>
      history.current.listen(() => {
        closeDrawer();
        closeDialog();
        closeSnackbar();
      }),
    [],
  );

  return (
    <AppContext.Provider
      value={{
        auth,
        logInWithToken,
        logOut,
        openDrawer,
        closeDrawer,
        openDialog,
        closeDialog,
        errorBoundary,
      }}
    >
      <GlobalStyle />
      {auth && (
        <LocationProvider history={history.current}>
          <Router>
            <WelcomeScreen path="/" />
            <Redirect from="/orgs" to="/" noThrow />
            <Org path="/orgs/:orgId">
              <ViewOrgScreen path="/" />
              <ListOrgMembersScreen path="/members" />
              <ListProjectsScreen path="/projects" />
              <Project path="/projects/:projectId">
                <ViewProjectScreen path="/" />
                <ListDevicesScreen path="/devices" />
                <ViewDeviceScreen path="/devices/:deviceId" />
                <ListDestinationsScreen path="/destinations" />
                <ViewDestinationScreen path="/destinations/:destinationId" />
                <ListRulesScreen path="/rules" />
                <ViewRuleScreen path="/rules/:ruleId" />
              </Project>
            </Org>
          </Router>
          <Footer />
          {drawer}
          {dialog}
          {snackbar}
        </LocationProvider>
      )}
    </AppContext.Provider>
  );
}
