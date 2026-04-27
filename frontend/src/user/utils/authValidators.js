/**
 * Auth Validation Utilities.
 * * This module contains pure functions dedicated to enforcing business rules
 * for user identity inputs. These validators are decoupled from the UI
 * and can be used in both forms and unit tests.
 * * @module Utils/AuthValidators
 */

/**
 * Validates login credentials based on format and presence.
 * * @function validateLogin
 * @param {Object} values - The form state containing email and password.
 * @param {string} values.email - User provided email.
 * @param {string} values.password - User provided password.
 * @returns {Object} An 'errors' object where keys correspond to field names 
 * and values are the error messages. Returns an empty object if valid.
 */
export const validateLogin = (values) => {
    let errors = {};

    // Email Validation: Presence and Regex format check
    if (!values.email) {
        errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Invalid email format";
    }

    // Password Validation: Presence and Minimum security length
    if (!values.password) {
        errors.password = "Password is required";
    } else if (values.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    }

    return errors;
};

/**
 * Validates registration data by extending the login logic.
 * * **Pattern: Function Composition**. This validator reuses 'validateLogin'
 * to maintain consistent rules for shared fields (email/password) across the app.
 * * @function validateRegister
 * @param {Object} values - The form state including name, email, and password.
 * @param {string} values.name - User's full name.
 * @returns {Object} A combined 'errors' object for all registration fields.
 */
export const validateRegister = (values) => {
    /** * Initializing errors with shared credential logic.
     * This ensures that if we change password length rules, 
     * it updates both Login and Register flows automatically.
     */
    let errors = validateLogin(values);

    // Name Validation: Specific to the registration flow
    if (!values.name) {
        errors.name = "Full name is required";
    }

    return errors;
};