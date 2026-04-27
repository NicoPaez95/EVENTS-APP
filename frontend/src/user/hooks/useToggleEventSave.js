// user/hooks/useToggleEventSave.js
import { useUser } from "../context/UserContext";
import useNotification from "./useNotification";

/**
 * @typedef {Object} ToggleEventSaveHook
 * @property {(id: string|number) => void} onToggleSave - Toggles save/unsave state for a given event.
 * @property {(id: string|number) => boolean} isEventSaved - Checks if an event is currently saved.
 */

/**
 * useToggleEventSave (Use-Case Hook)
 *
 * Encapsulates the interaction logic for saving and unsaving events.
 * Acts as an orchestration layer between:
 * - User domain (state management)
 * - Notification system (UI feedback)
 *
 * Responsibilities:
 * - Toggle event persistence state
 * - Provide immediate user feedback via toasts
 * - Expose a clean interface for UI components
 *
 * This hook abstracts away domain coordination and should be used
 * by feature-level components instead of directly accessing UserContext.
 *
 * @hook
 * @category Hooks/User
 * @returns {ToggleEventSaveHook}
 */
const useToggleEventSave = () => {
    const { toggleSaveEvent, isEventSaved } = useUser();
    const { showToast } = useNotification();

    /**
     * Handles save/unsave interaction for an event.
     *
     * @param {string|number} id - Unique identifier of the event.
     * @returns {void}
     */
    const handleToggleAction = (id) => {
        const wasSaved = isEventSaved(id);

        toggleSaveEvent(id);

        if (wasSaved) {
            showToast("Removed from calendar", "info");
        } else {
            showToast("Added! ✨", "success");
        }
    };

    return {
        onToggleSave: handleToggleAction,
        isEventSaved,
    };
};

export default useToggleEventSave;