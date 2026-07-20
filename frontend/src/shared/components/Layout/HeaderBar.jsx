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
 * - Multi-Row Responsive Flow: Adopts a mobile-first stacked strategy that isolates identity
 *   controls into a top row while dropping discovery features to an independent full-width
 *   bottom row, maximizing touch targets and avoiding viewport squishing.
 *
 * @component
 * @category Components/Layout
 * @returns {React.JSX.Element} The adaptive navigation header bar markup tree structure.
 */
const HeaderBar = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  const showDiscovery = pathname === "/" || pathname === "/events/upcoming";

  const currentLang = i18n.language?.slice(0, 2) || "en";

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === "en" ? "es" : "en");
  };

  return (
    <header className="flex flex-col gap-4 mb-6 md:mb-10" role="banner">
      {/* Top Row: Anchors logo identity and action triggers side-by-side across all devices */}
      <div className="flex items-center justify-between w-full gap-4">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-black text-accent hover:scale-105 transition-transform shrink-0 flex items-center"
        >
          EVENT<span className="text-primary">APP</span>
        </Link>

        {/* Action Panel Slot: Orchestrates localized triggers and session micro-states */}
        <div className="flex items-center gap-3 text-sm flex-shrink-0">
          <button
            onClick={toggleLanguage}
            className="text-xs sm:text-sm font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-slate-200 bg-surface 
                       text-secondary hover:border-primary hover:text-primary transition-all duration-200 
                       active:scale-95 flex items-center gap-2 shadow-sm shrink-0"
          >
            {currentLang === "en" ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 750 500"
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover shrink-0"
                >
                  <path fill="#c60b1e" d="M0 0h750v500H0z" />
                  <path fill="#f1bf00" d="M0 125h750v250H0z" />
                  <path
                    fill="#c60b1e"
                    d="M185 175v135h-50V175h50m10 0h10v135h-10V175m-80 0h10v135h-10V175"
                  />
                </svg>
                <span className="tracking-wide hidden xs:inline">es</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 741 390"
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover shrink-0"
                >
                  <path fill="#b22234" d="M0 0h741v390H0z" />
                  <path
                    fill="#f0f8ff"
                    d="M0 30h741v30H0m0 60h741v30H0m0 60h741v30H0m0 60h741v30H0m0 60h741v30H0m0 60h741v30H0"
                  />
                  <path fill="#3c3b6e" d="M0 0h296.4v210H0z" />
                  {/* ... resto del SVG de USA */}
                </svg>
                <span className="tracking-wide hidden xs:inline">en</span>
              </>
            )}
          </button>
          <UserAuthFeature />
        </div>
      </div>

      {/* Bottom Row: Isolates the discovery platform to prevent inline compression anomalies */}
      {showDiscovery && (
        <div className="w-full animate-in fade-in slide-in-from-top-2 duration-300">
          <EventDiscoveryFeature />
        </div>
      )}
    </header>
  );
};

export default HeaderBar;
