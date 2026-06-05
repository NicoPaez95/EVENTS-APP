/**
 * @file useToggleEventSave.js
 * @description Use-case hook that orchestrates event saving logic with Authentication guards.
 * It abstracts the complexity of coordinating state, notifications, and soft interceptive modal triggers.
 * @module hooks/useToggleEventSave
 * @author Nico Paez
 */

import { useUser } from "../context/UserContext";
import { useAuth } from "../context/AuthContext";
import { useAuthModal } from "../../shared/context/AuthModalContext";
import useNotification from "./useNotification";

/**
 * @typedef {Object} ToggleEventSaveHook
 * @property {(id: string|number) => Promise<void>} onToggleSave - Protected function to toggle event state.
 * @property {(id: string|number) => boolean} isEventSaved - Function to check current event status.
 */

/**
 * Custom hook to handle event save/remove interactions.
 * * Includes an Authentication Interceptor Guard that captures unauthenticated user sessions,
 * safely halting remote operations to reveal an informative sign-in prompt modal.
 * * @hook
 * @category Hooks/User
 * @returns {ToggleEventSaveHook} Orchestration actions decoupled from presentation markup.
 */
const useToggleEventSave = () => {
    const { toggleSavedEvent, isSaved } = useUser();
    const { isAuthenticated } = useAuth();
    const { openAuthPrompt } = useAuthModal();
    const { showToast } = useNotification();

    /**
     * Executes the toggle action if the user is authenticated, otherwise intercepts the operation.
     * * @async
     * @param {string|number} id - The unique identifier of the target event asset.
     * @returns {Promise<void>} Resolves tracking transitions smoothly.
     */
    const handleToggleAction = async (id) => {
        // 1. GUEST MODE & AUTHENTICATION INTERCEPTION GUARD
        if (!isAuthenticated) {
            openAuthPrompt();
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