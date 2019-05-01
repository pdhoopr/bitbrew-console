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
import { GlobalStyle } from "../design-system";
import { silentRefresh } from "../utils";
import AppContext from "./AppContext";
import ListDestinationsScreen from "./destinations/ListDestinationsScreen";
import ViewDestinationScreen from "./destinations/ViewDestinationScreen";
import ListDevicesScreen from "./devices/ListDevicesScreen";
import ViewDeviceScreen from "./devices/ViewDeviceScreen";
import HomeScreen from "./HomeScreen";
import ListOrgMembersScreen from "./orgs/ListOrgMembersScreen";
import Org from "./orgs/Org";
import ViewOrgScreen from "./orgs/ViewOrgScreen";
import ListProjectsScreen from "./projects/ListProjectsScreen";
import Project from "./projects/Project";
import ViewProjectScreen from "./projects/ViewProjectScreen";
import ListRulesScreen from "./rules/ListRulesScreen";
import ViewRuleScreen from "./rules/ViewRuleScreen";
import Footer from "./shared/Footer";
import Http403Dialog from "./shared/Http403Dialog";
import Http404Dialog from "./shared/Http404Dialog";
import HttpErrorDialog from "./shared/HttpErrorDialog";
import HttpErrorSnackbar from "./shared/HttpErrorSnackbar";
import HttpSuccessSnackbar from "./shared/HttpSuccessSnackbar";
import ScreenNotFound from "./shared/ScreenNotFound";

const Router = styled(ReachRouter)`
  flex: 1;
`;

export default function App() {
  const historyRef = useRef(createHistory(window));

  const [auth, setAuth] = useState(null);
  const [drawer, setDrawer] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  function logIn(token) {
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
      logIn(token);
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
      logIn(token);
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

  async function catchAppErrors(request) {
    try {
      await request();
      return null;
    } catch (error) {
      const statusCode = error.response ? error.response.status : 500;
      if (statusCode === 403) {
        openDialog(<Http403Dialog />);
      } else if (statusCode === 404) {
        openDialog(<Http404Dialog />);
      } else {
        openDialog(<HttpErrorDialog />);
      }
      return error;
    }
  }

  async function catchResourceErrors(resourceType, request) {
    try {
      const response = await request();
      if (response.status !== 100) {
        openSnackbar(
          <HttpSuccessSnackbar
            statusCode={response.status}
            resourceType={resourceType}
          />,
        );
      }
      return null;
    } catch (error) {
      openSnackbar(
        <HttpErrorSnackbar
          statusCode={error.response ? error.response.status : 500}
          resourceType={resourceType}
        />,
      );
      return error;
    }
  }

  async function refreshAndRetryOn401(error) {
    if (error.response && error.response.status === 401) {
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
      historyRef.current.listen(() => {
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
        logIn,
        logOut,
        openDrawer,
        closeDrawer,
        openDialog,
        closeDialog,
        openSnackbar,
        closeSnackbar,
        catchAppErrors,
        catchResourceErrors,
      }}
    >
      <GlobalStyle />
      {auth && (
        <LocationProvider history={historyRef.current}>
          <Router>
            <HomeScreen path="/" />
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
                <ScreenNotFound default />
              </Project>
              <ScreenNotFound default />
            </Org>
            <ScreenNotFound default />
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
