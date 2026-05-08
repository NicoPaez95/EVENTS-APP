/**
 * @file useToggleEventSave.js
 * @description Use-case hook that orchestrates event saving logic with Authentication guards.
 * It abstracts the complexity of coordinating state, notifications, and navigation.
 * @module hooks/useToggleEventSave
 * @author Nico Paez
 */

import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useAuthContext } from "../context/AuthContext";
import useNotification from "./useNotification";

/**
 * @typedef {Object} ToggleEventSaveHook
 * @property {(id: string|number) => Promise<void>} onToggleSave - Protected function to toggle event state.
 * @property {(id: string|number) => boolean} isEventSaved - Function to check current event status.
 */

/**
 * Custom hook to handle event save/remove interactions.
 * 
 * Includes an Authentication Guard that redirects unauthenticated users to the login page
 * and prevents unnecessary notification triggers.
 * 
 * @hook
 * @category Hooks/User
 * @returns {ToggleEventSaveHook}
 */
const useToggleEventSave = () => {
    const { toggleSavedEvent, isSaved } = useUser();
    const { isAuthenticated } = useAuthContext();
    const { showToast } = useNotification();
    const navigate = useNavigate();

    /**
     * Executes the toggle action if the user is authenticated.
     * 
     * @async
     * @param {string|number} id - The unique identifier of the event.
     * @returns {Promise<void>}
     */
    const handleToggleAction = async (id) => {
        // 1. AUTHENTICATION GUARD
        if (!isAuthenticated) {
            showToast("Please login to save events", "info");
            navigate("/login");
            return;
        }

        // 2. PRE-CHECK STATE
        const wasSaved = isSaved(id);

        try {
            // 3. PERSISTENCE LOGIC
            await toggleSavedEvent(id);

            // 4. CONTEXTUAL FEEDBACK
            if (wasSaved) {
                showToast("Removed from calendar", "info");
            } else {
                showToast("Added to your events! ✨", "success");
            }
        } catch (error) {
            showToast("Operation failed. Please try again.", "error");
            console.error("[useToggleEventSave] Error:", error.message);
        }
    };

    return {
        onToggleSave: handleToggleAction,
        isEventSaved: isSaved,
    };
};

export default useToggleEventSave;