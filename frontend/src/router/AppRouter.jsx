/**
 * @file AppRouter.jsx
 * @description Centralized routing architecture mapping browser paths to domain views.
 * Controls layout configuration wrapping and embeds top-level navigation dependent overlays.
 * @module router/AppRouter
 * @author Nico Paez
 */

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/events/HomePage";
import EventDetailPage from "../pages/events/EventDetailPage";
import UpcomingEventsPage from "../pages/events/UpcomingEventsPage";
import SavedEventsPage from "../pages/user/SavedEventsPage";
import CartPage from "../pages/cart/CartPage";
import Auth from "../pages/user/AuthPage";
import Profile from "../pages/user/ProfilePage";
import ProtectedRoute from "../shared/components/guards/ProtectedRoute";
import MainLayout from "../shared/components/Layout/MainLayout";
import AuthModalContainer from "../shared/components/UI/AuthModalContainer";
import FloatingCartWidget from "../shared/components/UI/FloatingCartWidget";

/**
 * AppRouter Component (Root Navigation Orchestrator).
 *
 * Maps active path entities to declarative visual components while anchoring layout hierarchies.
 *
 * Architectural Strategy:
 * - Nested Routing: Wraps standard paths within `MainLayout` to provide a unified shell structure.
 * - Guarded Boundaries: Encapsulates user scopes under `ProtectedRoute` HOC parameters.
 * - Global Portal Injection: Places `AuthModalContainer` directly under BrowserRouter to inherit
 * navigation context metrics safely without throwing runtime instantiation exceptions.
 *
 * @component
 * @category Router
 * @returns {React.JSX.Element} The configuration tree wrapper initialized with browser connection contexts.
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* Centralized UI portal container for unauthenticated guest interception alerts */}
      <AuthModalContainer />
      {/* Ambient notification layer tracking global transaction entities in real-time */}
      <FloatingCartWidget />
      <Routes>
        {/* --- Primary UI Shell Layer (Standard View with Sidebar) --- */}
        <Route element={<MainLayout />}>
          {/**
           * Home: The default discovery hub.
           * Inherits the full MainLayout configuration.
           */}
          <Route path="/" element={<Home />} />

          {/** Upcoming Events: Filtered discovery stream */}
          <Route path="/events/upcoming" element={<UpcomingEventsPage />} />

          {/**
           * Cart Workspace: Ambient transaction pool.
           * Publicly accessible to allow flexible pre-checkout booking reviews.
           */}
          <Route path="/cart" element={<CartPage />} />

          {/**
           * Protected User Domain:
           * Routes that require an active session and the persistent UI Shell.
           */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/saved-events"
            element={
              <ProtectedRoute>
                <SavedEventsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* --- Focused Content Layer (Full-width View, No Sidebar) --- */}
        <Route
          path="/events/:id"
          element={
            <MainLayout showSidebar={false}>
              <EventDetailPage />
            </MainLayout>
          }
        />

        {/* --- Independent Layer (Minimalist View, No Layout) --- */}
        {/**
         * Auth: Login and Registration flows.
         * Rendered independently to maximize focus and minimize navigation noise.
         */}

        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />

        {/* --- Global Fallback Layer --- */}
        {/** Redirects any undefined paths back to the home entry point */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
