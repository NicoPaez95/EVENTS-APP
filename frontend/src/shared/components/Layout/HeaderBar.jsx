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

  const showDiscovery = pathname === "/" || pathname === "/events/upcoming";

  const currentLang = i18n.language?.slice(0, 2) || "en";

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === "en" ? "es" : "en");
  };

  return (
    <header
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10"
      role="banner"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-grow">
        <Link
          to="/"
          className="text-2xl font-black text-accent hover:scale-105 transition-transform shrink-0 flex items-center"
        >
          EVENT<span className="text-primary">APP</span>
        </Link>

        {showDiscovery && (
          <div className="w-full animate-in fade-in slide-in-from-left-4 duration-500">
            <EventDiscoveryFeature />
          </div>
        )}
      </div>

      {/* Action Slot Panel: Scales control items dynamically for high-fidelity legibility */}
      <div className="flex items-center gap-4 flex-shrink-0 text-sm sm:text-base">
        {/* Scale-Optimized Language Toggle Trigger */}
        <button
          onClick={toggleLanguage}
          aria-label={`Switch language to ${currentLang === "en" ? "Spanish" : "English"}`}
          className="text-sm font-bold px-4 py-2 rounded-full border border-slate-200 bg-surface 
                     text-secondary hover:border-primary hover:text-primary transition-all duration-200 
                     active:scale-95 flex items-center gap-2 shadow-sm shrink-0"
        >
          {currentLang === "en" ? (
            <>
              {/* Spain SVG Flag Icon - Optimized to 20px */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 750 500"
                className="w-5 h-5 rounded-full object-cover shrink-0 shadow-sm border border-slate-100"
              >
                <path fill="#c60b1e" d="M0 0h750v500H0z" />
                <path fill="#febca3" d="M0 125h750v250H0z" />
                <path fill="#f1bf00" d="M0 125h750v250H0z" />
                <path
                  fill="#c60b1e"
                  d="M185 175v135h-50V175h50m10 0h10v135h-10V175m-80 0h10v135h-10V175"
                />
              </svg>
              <span className="tracking-wide">es</span>
            </>
          ) : (
            <>
              {/* USA SVG Flag Icon - Optimized to 20px */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 741 390"
                className="w-5 h-5 rounded-full object-cover shrink-0 shadow-sm border border-slate-100"
              >
                <path fill="#b22234" d="M0 0h741v390H0z" />
                <path
                  fill="#f0f8ff"
                  d="M0 30h741v30H0m0 60h741v30H0m0 60h741v30H0m0 60h741v30H0m0 60h741v30H0m0 60h741v30H0"
                />
                <path fill="#3c3b6e" d="M0 0h296.4v210H0z" />
                <g fill="#f0f8ff">
                  <g id="s1">
                    <g id="s2">
                      <polygon points="24.7,13.5 28.1,23.9 19.3,17.5 30.1,17.5 21.3,23.9" />
                      <polygon points="57.3,13.5 60.7,23.9 51.9,17.5 62.7,17.5 53.9,23.9" />
                      <polygon points="89.9,13.5 93.3,23.9 84.5,17.5 95.3,17.5 86.5,23.9" />
                      <polygon points="122.5,13.5 125.9,23.9 117.1,17.5 127.9,17.5 119.1,23.9" />
                      <polygon points="155.1,13.5 158.5,23.9 149.7,17.5 160.5,17.5 151.7,23.9" />
                      <polygon points="187.7,13.5 191.1,23.9 182.3,17.5 193.1,17.5 184.3,23.9" />
                    </g>
                    <use href="#s2" y="30" />
                    <use href="#s2" y="60" />
                    <use href="#s2" y="90" />
                    <use href="#s2" y="120" />
                  </g>
                  <g id="s3" x="16.3" y="15">
                    <polygon points="24.7,13.5 28.1,23.9 19.3,17.5 30.1,17.5 21.3,23.9" />
                    <polygon points="57.3,13.5 60.7,23.9 51.9,17.5 62.7,17.5 53.9,23.9" />
                    <polygon points="89.9,13.5 93.3,23.9 84.5,17.5 95.3,17.5 86.5,23.9" />
                    <polygon points="122.5,13.5 125.9,23.9 117.1,17.5 127.9,17.5 119.1,23.9" />
                    <polygon points="155.1,13.5 158.5,23.9 149.7,17.5 160.5,17.5 151.7,23.9" />
                  </g>
                  <use href="#s3" y="30" />
                  <use href="#s3" y="60" />
                  <use href="#s3" y="90" />
                </g>
              </svg>
              <span className="tracking-wide">en</span>
            </>
          )}
        </button>

        {/* Global identity layout feature slots inside this context react to parent typographic metrics */}
        <UserAuthFeature />
      </div>
    </header>
  );
};

export default HeaderBar;
