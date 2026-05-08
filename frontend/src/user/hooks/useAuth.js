/**
 * @file useAuth.js
 * @description Authentication Facade Hook.
 * Provides a unified and normalized interface for authentication state and actions,
 * abstracting the underlying AuthContext complexity.
 * @module hooks/useAuth
 * @author Nico Paez
 */

import { useAuthContext } from '../context/AuthContext';

/**
 * @typedef {Object} AuthInterface
 * @property {Object|null} user - The raw user profile object from the provider.
 * @property {string|undefined} userId - Normalized unique identifier for the authenticated user.
 * @property {string|undefined} token - Bearer token for API authorization.
 * @property {boolean} isAuthenticated - Original flag for authentication status.
 * @property {boolean} isLoggedIn - Normalized flag for UI-wide consistency.
 * @property {boolean} isAdmin - Evaluates if the current user has administrative privileges.
 * @property {boolean} isGuest - Evaluates if the current session is anonymous.
 * @property {function} login - Method to initialize a session.
 * @property {function} logout - Method to terminate the session and clear local storage.
 */

/**
 * useAuth Hook (Facade Pattern).
 * 
 * This hook acts as the primary interface for all authentication-related data.
 * It performs data normalization to ensure consistency across different contexts
 * (e.g., mapping `user.id` to `userId`) and derives computed properties like `isAdmin`.
 * 
 * @hook
 * @category Hooks/Security
 * @returns {AuthInterface} The augmented and normalized authentication state.
 */
export const useAuth = () => {
  /**
   * Core Context Consumption:
   * Retrieves the base state from the global AuthProvider.
   */
  const auth = useAuthContext();

  /**
   * Derived Permissions:
   * Logic for Role-Based Access Control (RBAC) encapsulated here.
   */
  const isAdmin = auth.user?.role === 'admin';
  const isGuest = !auth.isAuthenticated;

  /**
   * Interface Normalization:
   * We map internal context names to a standardized API used by 
   * UserContext and other high-level features.
   */
  return {
    ...auth,
    // --- Name Normalization ---
    userId: auth.user?.id,
    token: auth.user?.token,
    isLoggedIn: auth.isAuthenticated,
    // --- Computed Logic ---
    isAdmin,
    isGuest,
    // Future extensions can be added here (e.g., hasPermission, isPremium)
  };
};