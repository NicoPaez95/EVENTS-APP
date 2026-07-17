/**
 * @file HeaderBar.jsx
 * @description Primary navigational and branding anchor layout component.
 * Acts as a host container orchestrating core feature slots like user authentication
 * and context-aware event discovery workflows.
 * @module components/layout/HeaderBar
 * @author Nico Paez
 */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserAuthFeature from "../../../user/features/UserAuthFeature";
import EventDiscoveryFeature from "../../../events/features/EventDiscoveryFeature";

/**
 * HeaderBar Component.
 *
 * This component acts as the primary navigational and branding anchor of the application.
 * It is integrated within the MainLayout and serves as a host for global features.
 *
 * Architectural Strategy:
 * - Routing Awareness: Uses `useLocation` to implement conditional rendering logic,
 *   ensuring that search tools are only visible in appropriate discovery contexts.
 * - Internationalization (i18n): Integrates `useTranslation` to handle runtime language
 *   switching, providing a global entry point for localization.
 * - Feature Integration: Acts as a "Slot" or "Host" for cross-domain orchestrators
 *   like `EventDiscovery` (Events Domain) and `UserAuthFeature` (User Domain).
 * - Responsive Layout: Employs a flexible flexbox structure that adapts from
 *   stacked mobile views to justified desktop layouts.
 *
 * @component
 * @category Components/Layout
 * @returns {React.JSX.Element} The adaptive navigation header bar markup tree structure.
 */
const HeaderBar = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  /**
   * Visibility Logic:
   * Determines if the EventDiscovery search bar should be rendered.
   * Currently enabled for the Root (Home) and Upcoming Events views.
   * @type {boolean}
   */
  const showDiscovery = pathname === "/" || pathname === "/events/upcoming";

  /**
   * Normalized active locale string sequence.
   * @type {string}
   */
  const currentLang = i18n.language?.slice(0, 2) || "en";

  /**
   * Translation Logic:
   * Switches the application's active locale between English and Spanish
   * when the language toggle button is triggered.
   * @returns {void}
   */
  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === "en" ? "es" : "en");
  };

  return (
    <header
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10"
      role="banner"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-grow">
        {/* Brand Identity: Serves as the primary 'Reset' navigation trigger */}
        <Link
          to="/"
          className="text-2xl font-black text-accent hover:scale-105 transition-transform shrink-0 flex items-center"
        >
          EVENT<span className="text-primary">APP</span>
        </Link>

        {/* 
          Conditional Feature Injection: 
          The search discovery feature is injected here only when the route matches 
          discovery-focused pages, maintaining UI focus on detail-heavy pages.
        */}
        {showDiscovery && (
          <div className="w-full animate-in fade-in slide-in-from-left-4 duration-500">
            <EventDiscoveryFeature />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Language Toggle Button */}
        <button
          onClick={toggleLanguage}
          aria-label="Toggle language"
          className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 
                     text-slate-600 hover:bg-slate-100 transition-colors tracking-widest"
        >
          {currentLang === "en" ? "ES" : "EN"}
        </button>

        {/* 
          Identity Management Slot: 
          Hosts the UserAuthFeature which manages the Login/Register/Logout state.
        */}
        <UserAuthFeature />
      </div>
    </header>
  );
};

export default HeaderBar;
