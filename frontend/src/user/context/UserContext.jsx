/**
 * @file UserContext.jsx
 * @description Global state management for user-specific data and interactions.
 * Orchestrates synchronization between MongoDB persistence and local UI state
 * for saved events, implementing optimistic updates for enhanced UX.
 * @module context/UserContext
 * @author Nico Paez
 */

import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { useAuth } from "../hooks/useAuth";
import { fetchSavedEventsIds, updateSavedEvent } from "../services/userService";

/**
 * @typedef {Object} UserContextValue
 * @property {Array<string>} savedIds - Collection of event identifiers bookmarked by the user.
 * @property {boolean} loading - Flag indicating asynchronous data synchronization.
 * @property {function(string|number): Promise<void>} toggleSaveEvent - Orchestrates save/unsave logic with backend persistence.
 * @property {function(string|number): boolean} isEventSaved - Evaluates if a specific event is in the user's collection.
 */

/**
 * Context object for User domain state.
 * @type {React.Context<UserContextValue|null>}
 */
const UserContext = createContext(null);

/**
 * UserProvider Component.
 * Acts as the Single Source of Truth for user-centric features.
 * Integrates with AuthContext to ensure data belongs to the authenticated session.
 *
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Component tree to be wrapped.
 * @returns {JSX.Element}
 */
export const UserProvider = ({ children }) => {
  // Destructuring normalized values from our useAuth hook
  const { userId, token, isLoggedIn } = useAuth();

  const [savedIds, setSavedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * Effect: Data Synchronization.
   * Hydrates the local state from MongoDB whenever the authentication status changes.
   * Clears state on logout.
   */
  useEffect(() => {
    const loadSavedData = async () => {
      if (isLoggedIn && userId && token) {
        setLoading(true);
        try {
          const ids = await fetchSavedEventsIds(userId, token);
          // Ensure all IDs are stored as strings for consistent comparison
          const normalizedIds = ids.map((id) => id.toString());
          setSavedIds(normalizedIds);
        } catch (err) {
          console.error("[UserContext] Error loading saved events:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setSavedIds([]);
      }
    };

    loadSavedData();
  }, [isLoggedIn, userId, token]);

  /**
   * Checks if an event is currently bookmarked by the user.
   * Performs type-agnostic comparison via string normalization.
   *
   * @function isEventSaved
   * @param {string|number} eventId - The identifier of the event to verify.
   * @returns {boolean}
   */
  const isEventSaved = useCallback(
    (eventId) => {
      if (!eventId) return false;
      return savedIds.some((id) => id.toString() === eventId.toString());
    },
    [savedIds]
  );

  /**
   * Toggles the bookmark status of an event.
   *
   * Process:
   * 1. Validates session.
   * 2. Executes Optimistic UI Update.
   * 3. Persists change to MongoDB via PATCH request.
   * 4. Reconciles state or performs rollback on failure.
   *
   * @async
   * @function toggleSaveEvent
   * @param {string|number} eventId - The target event identifier.
   * @returns {Promise<void>}
   */
  const toggleSaveEvent = useCallback(
    async (eventId) => {
      if (!isLoggedIn || !userId) {
        console.warn("[UserContext] Unauthorized attempt to toggle event.");
        return;
      }

      const eventIdStr = eventId.toString();
      const wasSaved = savedIds.some((id) => id.toString() === eventIdStr);

      // --- STAGE 1: Optimistic UI Update ---
      setSavedIds((prevIds) => {
        const isCurrentlyIn = prevIds.some(
          (id) => id.toString() === eventIdStr
        );
        return isCurrentlyIn
          ? prevIds.filter((id) => id.toString() !== eventIdStr)
          : [...prevIds, eventIdStr];
      });

      try {
        // --- STAGE 2: Backend Persistence ---
        const response = await updateSavedEvent(userId, eventIdStr, token);

        // --- STAGE 3: Final State Reconciliation ---
        if (response && response.savedEvents) {
          setSavedIds(response.savedEvents.map((id) => id.toString()));
        }
      } catch (err) {
        console.error("[UserContext] Persistence failed, reverting UI:", err);

        // --- STAGE 4: Error Recovery (Rollback) ---
        setSavedIds((prevIds) => {
          const isIncluded = prevIds.some((id) => id.toString() === eventIdStr);
          if (wasSaved && !isIncluded) return [...prevIds, eventIdStr];
          if (!wasSaved && isIncluded)
            return prevIds.filter((id) => id.toString() !== eventIdStr);
          return prevIds;
        });
      }
    },
    [isLoggedIn, userId, token, savedIds]
  );

  /**
   * Memoized Context Value.
   * Optimizes performance by preventing unnecessary re-renders of consuming components.
   */
  const value = useMemo(
    () => ({
      savedIds,
      toggleSaveEvent,
      [isEventSaved.name]: isEventSaved, // Explicitly naming for JSDoc clarity
      isEventSaved,
      loading,
    }),
    [savedIds, toggleSaveEvent, isEventSaved, loading]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/**
 * Custom hook to consume the UserContext.
 *
 * @example
 * const { savedIds, toggleSaveEvent } = useUser();
 *
 * @throws {Error} If used outside of a UserProvider.
 * @returns {UserContextValue} The user state and actions.
 */
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
