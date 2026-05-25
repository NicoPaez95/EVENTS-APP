/**
 * @file App.jsx
 * @description Root Application Component acting as the definitive entry point.
 * Establishes the centralized orchestration layer for the application's global state providers.
 * @module App
 * @author Nico Paez
 */

import React from "react";
import { NotificationProvider } from "./user/context/NotificationContext";
import { AuthProvider } from "./user/context/AuthContext";
import { AuthModalProvider } from "./shared/context/AuthModalContext";
import { EventsProvider } from "./events/context/EventsContext";
import { UserProvider } from "./user/context/UserContext";
import AppRouter from "./router/AppRouter";

/**
 * Root Application Component.
 *
 * Establishes the "Global State Layer" by nesting specialized Domain Context Providers.
 *
 * Architectural Note (The Provider Stack):
 * Providers are nested based on data dependency and lifecycle priority:
 * 1. NotificationProvider: Outermost, as UI feedback must be available even if Auth or Data layers fail.
 * 2. AuthProvider: Identity layer, as user credentials dictate access to protected user contexts.
 * 3. AuthModalProvider: Soft authentication state guard layer, tracking visibility flags for guest interaction interceptors.
 * 4. EventsProvider: Domain catalog state available globally to all exploration contexts.
 * 5. UserProvider: Nested deep because persistent preferences (e.g., saving an event) depend on both Auth and Events.
 *
 * @component
 * @category Core
 * @returns {React.JSX.Element} The high-level provider tree wrapping the application router.
 */
function App() {
  return (
    /**
     * UI Feedback Layer:
     * Centralized platform service for global notifications and alerts.
     */
    <NotificationProvider>
      {/**
       * Identity Layer:
       * Authoritative context managing operational session tokens and credentials.
       */}
      <AuthProvider>
        {/**
         * Interception State Layer:
         * Decoupled visibility engine tracking soft authentication prompts for guest users.
         */}
        <AuthModalProvider>
          {/**
           * Domain Data Layer:
           * Orchestrates global collections of event entities and cache states.
           */}
          <EventsProvider>
            {/**
             * User preferences Data Layer:
             * Handles personalized bookmarks and domain catalog cross-references.
             */}
            <UserProvider>
              {/**
               * Routing & Navigation Layer:
               * Resolves browser location states to concrete presentation components.
               */}
              <AppRouter />
            </UserProvider>
          </EventsProvider>
        </AuthModalProvider>
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
