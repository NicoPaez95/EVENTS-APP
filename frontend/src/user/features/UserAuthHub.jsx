/**
 * @file UserAuthHub.jsx
 * @description Domain-level composite feature that orchestrates the authentication workflow.
 * Manages the layout states and toggles between login and registration entry boundaries
 * based on the active path parameters, keeping the parent routing page strictly thin.
 * @module user/features/UserAuthHub
 * @author Nico Paez
 */

import React from "react";
import { useLocation } from "react-router-dom";
import AuthCard from "../components/AuthCard";
import AuthLogo from "../components/AuthLogo";
import AuthFooterNav from "../components/AuthFooterNav";
import LoginFeature from "./LoginFeature";
import RegisterFeature from "./RegisterFeature";
import { useTranslation } from "react-i18next";

/**
 * UserAuthHub Component.
 *
 * High-order smart orchestrator acting as the behavioral stage for security access points.
 * Intercepts routing parameters to dynamically mutate titles, sub-contexts, and form factories,
 * injecting the localized dictionaries required by presentation nodes.
 *
 * **Architectural Strategy**:
 * - **Path-Driven Orchestration**: Leverages the router's current location signature to pivot
 *   the entire layout view, avoiding local structural toggle flags.
 * - **Decoupled Child Props**: Directly handles localization hook calls and structures them into
 *   isolated schema blocks before sending them down to decoupled presentation views like AuthFooterNav.
 *
 * @component
 * @category Features/User
 * @returns {React.JSX.Element} The completely unified and interactive authentication subtree.
 */
const UserAuthHub = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation("events");

  /**
   * Local Routing Logic:
   * Determines the active interface profile based on the incoming path signature.
   */
  const isLogin = pathname === "/login";

  return (
    <>
      {/* Domain UI Component: Renders the high-level branding/logo */}
      <AuthLogo />

      <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
        {/* Domain UI Component: Provides the consistent card-like container for auth forms */}
        <AuthCard
          title={
            isLogin
              ? t("userAuthHub.islogin.welcome")
              : t("userAuthHub.islogin.createAccount")
          }
          subtitle={
            isLogin
              ? t("userAuthHub.islogin.enterDetails")
              : t("userAuthHub.islogin.join")
          }
        >
          {/* Feature Layer: Injects the smart component responsible for form logic and API calls */}
          {isLogin ? <LoginFeature /> : <RegisterFeature />}
        </AuthCard>

        {/* Domain UI Component: Navigation links to switch between Auth modes */}
        <AuthFooterNav
          isLogin={isLogin}
          i18n={{
            authFooterNav: {
              notAccount: t("authFooterNav.notAccount"),
              yesAccount: t("authFooterNav.yesAccount"),
              register: t("authFooterNav.register"),
              signin: t("authFooterNav.signin"),
            },
          }}
        />
      </div>
    </>
  );
};

export default UserAuthHub;
