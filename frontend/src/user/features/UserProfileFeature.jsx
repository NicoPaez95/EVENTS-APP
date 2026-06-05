/**
 * @file UserProfileFeature.jsx
 * @description Smart orchestration layer for the active user dashboard profile.
 * Intercepts global security contexts and guarantees non-blocking pipeline transitions.
 * @module user/features/UserProfileFeature
 * @author Nico Paez
 */

import React from "react";
import { useAuth } from "../hooks/useAuth";
import UserProfileCard from "../components/UserProfileCard";
import UserProfileSkeleton from "../components/UserProfileSkeleton"; // <--- Importación limpia

/**
 * UserProfileFeature Component.
 *
 * Smart domain controller managing the contextual validation tree for user credentials.
 * Delegating execution wrappers directly to designated layout presentation blocks.
 *
 * @component
 * @category Features/User
 * @returns {React.JSX.Element} The active state view component matches.
 */
const UserProfileFeature = () => {
  /**
   * Domain State:
   * Resolves the session profile payload from the central security handshake hook.
   */
  const { user } = useAuth();

  // Guard: If context hasn't resolved user details, mount the matching visual skeleton
  if (!user) {
    return <UserProfileSkeleton />;
  }

  // Final State: Deliver fully verified credentials into the presentation surface
  return <UserProfileCard user={user} />;
};

export default UserProfileFeature;
