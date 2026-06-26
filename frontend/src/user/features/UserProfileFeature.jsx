/**
 * @file UserProfileFeature.jsx
 * @description Smart orchestration container layer for the active user profile domain.
 * Intercepts corporate authentication state context and decouples localization injection mapping.
 * @module user/features/UserProfileFeature
 * @author Nico Paez
 */

import React from "react";
import { useAuth } from "../hooks/useAuth";
import UserProfileCard from "../components/UserProfileCard";
import UserProfileSkeleton from "../components/UserProfileSkeleton";
import { useTranslation } from "react-i18next";

/**
 * UserProfileFeature Component.
 *
 * A smart orchestrator ("Container Component") acting as the data domain controller
 * for user credentials. Resolves global authentication status and abstracts
 * localized asset contracts before rendering decoupled presentational layers.
 *
 * @component
 * @category Features/User
 * @returns {React.JSX.Element} The loading skeleton state view or the localized presentation card surface.
 */
const UserProfileFeature = () => {
  /**
   * Domain State & Context Hook.
   * Resolves the current session user object payload from the central security context.
   */
  const { user } = useAuth();

  /**
   * Internationalization Hook.
   * Binds the component to the 'events' translation namespace endpoint bundle.
   */
  const { t } = useTranslation("events");

  // Defensive Guard: If the authentication context has not resolved yet, mount the matching visual skeleton
  if (!user) {
    return <UserProfileSkeleton />;
  }

  // Final Render State: Inject clean parameters and explicit translation bindings down into the presentation card
  return (
    <UserProfileCard
      user={user}
      i18n={{
        title: t("profileFeature.userProfileCard.title"),
        description: t("profileFeature.userProfileCard.description"),
        fullName: t("profileFeature.userProfileCard.fullName"),
        email: t("profileFeature.userProfileCard.email"),
        activeAccount: t("profileFeature.userProfileCard.activeAccount"),
      }}
    />
  );
};

export default UserProfileFeature;
