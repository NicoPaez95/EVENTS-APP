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

/**
 * UserAuthHub Component.
 *
 * High-order smart orchestrator acting as the behavioral stage for security access points.
 * Intercepts routing parameters to dynamically mutate titles, sub-contexts, and form factories.
 *
 * @component
 * @category Features/User
 * @returns {React.JSX.Element} The completely unified and interactive authentication subtree.
 */
const UserAuthHub = () => {
  const { pathname } = useLocation();

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
          title={isLogin ? "Welcome Back" : "Create Account"}
          subtitle={
            isLogin
              ? "Enter details to access your account"
              : "Join our community of seekers"
          }
        >
          {/* Feature Layer: Injects the smart component responsible for form logic and API calls */}
          {isLogin ? <LoginFeature /> : <RegisterFeature />}
        </AuthCard>

        {/* Domain UI Component: Navigation links to switch between Auth modes */}
        <AuthFooterNav isLogin={isLogin} />
      </div>
    </>
  );
};

export default UserAuthHub;
