import { navigate, Redirect, Router as ReachRouter } from "@reach/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { off, on, removeToken, retry, setToken } from "../api";
import { silentRefresh, summarize } from "../utils";
import Context from "./Context";
import DestinationsPage from "./destinations/DestinationsPage";
import DeviceOverviewPage from "./devices/DeviceOverviewPage";
import DevicesPage from "./devices/DevicesPage";
import OrgMembersPage from "./orgs/OrgMembersPage";
import OrgOverviewPage from "./orgs/OrgOverviewPage";
import WithOrgNav from "./orgs/WithOrgNav";
import ProjectsPage from "./projects/ProjectsPage";
import WithProjectNav from "./projects/WithProjectNav";
import Banner from "./ui/Banner";
import Footer from "./ui/Footer";
import GlobalStyle from "./ui/GlobalStyle";
import WelcomePage from "./WelcomePage";

const Router = styled(ReachRouter)`
  flex: 1;
`;

export default function App() {
  const [auth, setAuth] = useState(null);
  const [drawer, setDrawer] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [banner, setBanner] = useState(null);

  function signInWithToken(token) {
    setToken(token);
    setAuth(token);
  }

  function signInWithRedirect() {
    const currentUrl = window.location.href;
    navigate(
      `https://service.bitbrew.com/auth/logout?redirect_uri=https://service.bitbrew.com/auth/login?redirect_uri=${currentUrl}`,
    );
  }

  async function signInWithSilentRefresh() {
    try {
      const token = await silentRefresh();
      signInWithToken(token);
    } catch {
      signInWithRedirect();
    }
  }

  function signInWithUrlParam() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");
    params.delete("access_token");
    const currentUrl = `${window.location.origin}${window.location.pathname}`;
    const queryWithoutToken = `?${params}`.replace(/\?$/, "");
    navigate(`${currentUrl}${queryWithoutToken}`, {
      replace: true,
    });
    if (document.referrer.startsWith("https://service.bitbrew.com")) {
      signInWithToken(token);
    } else {
      signInWithSilentRefresh();
    }
  }

  function signOut() {
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
      await signInWithSilentRefresh();
      const response = await retry(error);
      return response;
    }
    throw error;
  }

  useEffect(() => {
    if (/[?&]access_token=/.test(window.location.search)) {
      signInWithUrlParam();
    } else {
      signInWithSilentRefresh();
    }
    on("error", refreshAndRetryOn401);
    return () => {
      off("error", refreshAndRetryOn401);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        auth,
        signInWithToken,
        signOut,
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
        <React.Fragment>
          <Router>
            <WelcomePage path="/" />
            <Redirect from="/orgs" to="/" noThrow />
            <WithOrgNav path="/orgs/:orgId">
              <OrgOverviewPage path="/" />
              <OrgMembersPage path="/members" />
              <ProjectsPage path="/projects" />
            </WithOrgNav>
            <Redirect
              from="/orgs/:orgId/projects/:projectId"
              to="/orgs/:orgId/projects/:projectId/devices"
              noThrow
            />
            <WithProjectNav path="/orgs/:orgId/projects/:projectId">
              <DevicesPage path="/devices" />
              <DeviceOverviewPage path="/devices/:deviceId" />
              <DestinationsPage path="/destinations" />
            </WithProjectNav>
          </Router>
          <Footer />
          {drawer}
          {dialog}
          {banner}
        </React.Fragment>
      )}
    </Context.Provider>
  );
}
