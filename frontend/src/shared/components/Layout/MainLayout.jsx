/**
 * @file MainLayout.jsx
 * @description Primary UI Shell orchestrating the application's global layout structure.
 * Manages core responsive grids, persistent navigation elements, and dynamic nested routing viewports.
 * @module components/shared/layouts/MainLayout
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import HeaderBar from "./HeaderBar";

/**
 * MainLayout Component.
 *
 * Serves as the global frame for the application. Establishes the layout system
 * and orchestrates structural placement for persistent shell elements.
 *
 * Architectural Design:
 * - Nested Route Hosting: Leverages the react-router-dom `Outlet` to establish
 *   a parent routing viewport where dynamic page views are seamlessly injected.
 * - Flexible Grid Architecture: Implements a responsive Tailwind grid that evaluates
 *   the `showSidebar` state, alternating between a multi-column discovery layout
 *   and a focused, high-density presentation block for specific domain views.
 * - Legacy Compatibility Matrix: Preserves direct `children` injection slots to safely
 *   support standard non-routed page wrappers without introducing breaking changes.
 *
 * @component
 * @category Components/Shared
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} [props.children] - Legacy programmatic fallback slot for non-routed pages.
 * @param {boolean} [props.showSidebar=true] - Structural layout flag to toggle sidebar grid layouts.
 * @returns {React.JSX.Element} The foundational layout architecture shell.
 */
const MainLayout = ({ children, showSidebar = true }) => {
  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      {/* Persistent Global Header */}
      <HeaderBar />

      <div
        className={`grid grid-cols-1 ${
          showSidebar ? "lg:grid-cols-12" : "max-w-7xl mx-auto w-full"
        } gap-8`}
      >
        {/* Primary Content Region */}
        <main
          className={
            showSidebar ? "lg:col-span-9 space-y-10" : "w-full space-y-10"
          }
          role="main"
        >
          {/* 
            The Outlet acts as a declarative layout placeholder for the current route.
            Injects top-level pages like Home, Profile, and dynamic dashboards.
          */}
          <Outlet />

          {/* 
            Backward compatibility slot for views processed directly 
            outside the standard nested routing ecosystem.
          */}
          {children}
        </main>

        {/* 
          Conditional Sidebar:
          Evaluates the parent layout configuration rule to conditionally mount
          and isolate context navigation panels.
        */}
        {showSidebar && (
          <aside className="lg:col-span-3" role="complementary">
            <Sidebar />
          </aside>
        )}
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
  showSidebar: PropTypes.bool,
};

export default MainLayout;
