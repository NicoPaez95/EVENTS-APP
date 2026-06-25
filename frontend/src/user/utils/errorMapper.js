/**
 * Maps backend error messages to frontend i18n translation keys.
 *
 * @param {string} backendMessage - The raw error message from the server.
 * @returns {string} The corresponding i18n key path relative to the namespace.
 */
export const mapBackendErrorToKey = (backendMessage) => {
    if (!backendMessage) return "backendErrors.unknown";

    switch (backendMessage.trim()) {
        // --- Login Errors ---
        case "Invalid credentials, could not log you in.":
        case "Could not log you in, please check your credentials.":
            return "backendErrors.invalidCredentials";

        case "Logging in failed, please try again later.":
            return "backendErrors.serverError";

        // --- Register Errors ---
        case "Invalid inputs passed, please check your data.":
            return "backendErrors.invalidInputs";

        case "User exists already, please login instead.":
            return "backendErrors.userExists";

        case "Registering user failed, please try again later.":
            return "backendErrors.registerFailed";

        // --- Fallback ---
        default:
            return "backendErrors.unknown";
    }
};