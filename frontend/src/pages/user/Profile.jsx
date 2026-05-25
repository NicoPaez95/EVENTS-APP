/**
 * @file Profile.jsx
 * @description User Profile Page Component acting as the routing entry point.
 * Orchestrates high-level feature modules for profile management and user-curated catalogs.
 * @module pages/user/Profile
 * @author Nico Paez
 */

import React from "react";
import UserProfileFeature from "../../user/features/UserProfileFeature";
import SavedEventsListFeature from "user/features/SavedEventsListFeature";

/**
 * User Profile Page Component.
 *
 * This component acts as the high-level route entry point for the user's personal
 * management area. Its sole responsibility is to define the structural context
 * of the view within the application's routing hierarchy.
 *
 * Architectural Strategy:
 * - Thin Page Pattern: The component avoids managing local state, side effects,
 * or direct business logic.
 * - Feature Composite: Acts as a clean structural layout wrapper that integrates two independent
 * domain modules: `UserProfileFeature` (identity and settings) and `SavedEventsListFeature` (curated favorites).
 * - Decoupling: Maintains features separated by business logic parameters, ensuring high code reusability.
 *
 * @component
 * @category Pages
 * @returns {React.JSX.Element} The Profile page shell orchestrating layout feature branches.
 */
const Profile = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto px-4 py-6">
      {/**
       * User Identity Feature:
       * Handles personal credentials layout dashboards, tabs, and avatar metadata states.
       */}
      <UserProfileFeature />

      {/**
       * User Collection Feature:
       * Reusable domain list component displaying the reactive grid of saved event cards.
       */}
      <SavedEventsListFeature />
    </div>
  );
};

export default Profile;
