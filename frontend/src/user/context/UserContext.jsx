/**
 * @file UserContext.jsx
 * @description Global state provider for user preferences and persistent data.
 * Implements a local-first synchronization strategy for saved events.
 * @module context/UserContext
 * @author Nico Paez
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useAuth } from "./AuthContext";
import { fetchSavedEventsIds, updateSavedEvent } from "../services/userService";

/**
 * @typedef {Object} UserContextValue
 * @property {string[]} savedIds - Array of saved event IDs.
 * @property {(id: string|number) => Promise<void>} toggleSavedEvent - Async toggle handler.
 * @property {(id: string|number) => boolean} isSaved - Status checker.
 */

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const userId = user?.id;
  const token = user?.token;

  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem("user_saved_events");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("[UserContext] Hydration Error:", error);
      return [];
    }
  });

  // Synchronize local state with remote API
  useEffect(() => {
    const synchronizeData = async () => {
      if (isAuthenticated && userId && token) {
        try {
          const ids = await fetchSavedEventsIds(userId, token);
          const normalizedIds = ids.map((id) => id.toString());
          setSavedIds(normalizedIds);
          localStorage.setItem(
            "user_saved_events",
            JSON.stringify(normalizedIds)
          );
        } catch (err) {
          console.error("[UserContext] Sync Error:", err.message);
        }
      } else if (!isAuthenticated) {
        setSavedIds([]);
        localStorage.removeItem("user_saved_events");
      }
    };
    synchronizeData();
  }, [isAuthenticated, userId, token]);

  const handleToggleEvent = useCallback(
    async (eventId) => {
      if (!isAuthenticated) return;
      try {
        const updatedIds = await updateSavedEvent(userId, eventId, token);
        const normalizedIds = updatedIds.map((id) => id.toString()); // Generates a clean new reference
        setSavedIds(normalizedIds);
        localStorage.setItem(
          "user_saved_events",
          JSON.stringify(normalizedIds)
        );
      } catch (err) {
        console.error("[UserContext] Toggle Error:", err);
        throw err;
      }
    },
    [isAuthenticated, userId, token]
  );

  const isSaved = useCallback(
    (id) => (id ? savedIds.includes(id.toString()) : false),
    [savedIds]
  );

  const value = useMemo(
    () => ({
      savedIds,
      toggleSavedEvent: handleToggleEvent, // Exposed properly with stable tracking
      isSaved,
    }),
    [savedIds, handleToggleEvent, isSaved]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
