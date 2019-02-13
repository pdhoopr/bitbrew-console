import {
  createHistory,
  LocationProvider,
  navigate,
  Redirect,
  Router as ReachRouter,
} from "@reach/router";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { off, on, removeToken, retry, setToken } from "../api";
import { silentRefresh, summarize } from "../utils";
import DestinationInfoPage from "./destinations/DestinationInfoPage";
import DestinationsPage from "./destinations/DestinationsPage";
import DeviceInfoPage from "./devices/DeviceInfoPage";
import DevicesPage from "./devices/DevicesPage";
import GlobalContext from "./GlobalContext";
import OrgInfoPage from "./orgs/OrgInfoPage";
import OrgMembersPage from "./orgs/OrgMembersPage";
import WithOrgNav from "./orgs/WithOrgNav";
import ProjectInfoPage from "./projects/ProjectInfoPage";
import ProjectsPage from "./projects/ProjectsPage";
import WithProjectNav from "./projects/WithProjectNav";
import RuleInfoPage from "./rules/RuleInfoPage";
import RulesPage from "./rules/RulesPage";
import Banner from "./ui/Banner";
import Footer from "./ui/Footer";
import GlobalStyle from "./ui/GlobalStyle";
import WelcomePage from "./WelcomePage";

const Router = styled(ReachRouter)`
  flex: 1;
`;

export default function App() {
  const history = useRef(createHistory(window));

  const [auth, setAuth] = useState(null);
  const [drawer, setDrawer] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [banner, setBanner] = useState(null);

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
    removeToken();
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

  function openBanner(component) {
    setBanner(component);
  }

  function closeBanner() {
    setBanner(null);
  }

  async function errorBoundary(code) {
    try {
      await code();
      return null;
    } catch (error) {
      openBanner(<Banner>{summarize(error)}</Banner>);
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
        closeBanner();
      }),
    [],
  );

  return (
    <GlobalContext.Provider
      value={{
        auth,
        logInWithToken,
        logOut,
        openDrawer,
        closeDrawer,
        openDialog,
        closeDialog,
        openBanner,
        closeBanner,
        errorBoundary,
      }}
    >
      <GlobalStyle />
      {auth && (
        <LocationProvider history={history.current}>
          <Router>
            <WelcomePage path="/" />
            <Redirect from="/orgs" to="/" noThrow />
            <WithOrgNav path="/orgs/:orgId">
              <OrgInfoPage path="/" />
              <OrgMembersPage path="/members" />
              <ProjectsPage path="/projects" />
            </WithOrgNav>
            <WithProjectNav path="/orgs/:orgId/projects/:projectId">
              <ProjectInfoPage path="/" />
              <DevicesPage path="/devices" />
              <DeviceInfoPage path="/devices/:deviceId" />
              <DestinationsPage path="/destinations" />
              <DestinationInfoPage path="/destinations/:destinationId" />
              <RulesPage path="/rules" />
              <RuleInfoPage path="/rules/:ruleId" />
            </WithProjectNav>
          </Router>
          <Footer />
          {drawer}
          {dialog}
          {banner}
        </LocationProvider>
      )}
    </GlobalContext.Provider>
  );
}
