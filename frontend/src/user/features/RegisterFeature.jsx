/**
 * @file RegisterFeature.jsx
 * @description Smart container and feature orchestrator managing the user authentication registration lifecycle.
 * Coordinates validation hooks, async execution flows, error mapping layers, and multi-language form schemas.
 * @module features/user/containers/RegisterFeature
 * @author Nico Paez
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";
import { useFormValidation } from "../hooks/useFormValidation";
import RegisterForm from "../components/RegisterForm";
import { validateRegister } from "user/utils/authValidators";
import { mapBackendErrorToKey } from "../utils/errorMapper";

/**
 * RegisterFeature Component.
 *
 * This component orchestrates the user registration lifecycle. It bridges the
 * gap between the presentational `RegisterForm` and the global `AuthContext`,
 * managing asynchronous states, server-side error mapping, and internationalized feedback.
 *
 * @component
 * @category Features/User
 * @returns {React.JSX.Element} The orchestrated registration flow with full i18n error handling.
 */
const RegisterFeature = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation("events");

  /**
   * Feature UI State.
   * Tracks loading status and captures non-validation translated errors (e.g., Server 500 or 422).
   */
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  /**
   * Form Logic Integration.
   * Encapsulates the 'name', 'email', and 'password' state logic.
   */
  const { values, errors, handleChange, isValid } = useFormValidation(
    { name: "", email: "", password: "" },
    validateRegister
  );

  /**
   * Orchestrates the registration submission, maps API exceptions, and updates local error state.
   * @async
   * @param {React.FormEvent} e - Form event object.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null); // Reset server feedback on new attempt

    // Step 1: Frontend Validation Check
    if (!isValid()) return;

    setIsLoading(true);
    try {
      console.log(
        "[RegisterFeature]: Attempting to register user",
        values.name
      );

      // Step 2: Invoke Auth Domain logic
      await register(values.name, values.email, values.password);

      // Step 3: Success Navigation
      navigate("/profile");
    } catch (error) {
      // Step 4: Exception Handling & Localization Mapping
      console.error("[RegisterFeature Error]:", error.message);

      // Map the raw server string to an i18n key path and resolve its translation
      const errorKey = mapBackendErrorToKey(error.message);
      setServerError(t(errorKey));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 
        Global Server Feedback Area: 
        Displays exceptions mapped cleanly to your custom 'danger' semantic design tokens.
      */}
      {serverError && (
        <div
          className="bg-danger-light border border-danger/30 text-danger px-4 py-2 rounded-xl mb-4 text-center text-sm font-medium animate-in fade-in slide-in-from-top-2"
          role="alert"
        >
          {serverError}
        </div>
      )}

      <RegisterForm
        values={values}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        i18n={{
          primaryInput: {
            name: t("registerFeature.registerForm.name"),
            placeholdername: t("registerFeature.registerForm.placeholdername"),
            email: t("registerFeature.registerForm.email"),
            placeholder: t("registerFeature.registerForm.placeholder"),
            password: t("registerFeature.registerForm.password"),
            loadingText: t("registerFeature.registerForm.loadingText"),
            createAccount: t("registerFeature.registerForm.createAccount"),
            yesAccount: t("registerFeature.registerForm.yesAccount"),
            signin: t("registerFeature.registerForm.signin"),
          },
        }}
      />
    </>
  );
};

export default RegisterFeature;
