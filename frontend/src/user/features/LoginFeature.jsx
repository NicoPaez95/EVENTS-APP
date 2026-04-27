import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useFormValidation } from "../hooks/useFormValidation";
import useNotification from "../hooks/useNotification";
import LoginForm from "../components/LoginForm";
import { validateLogin } from "../utils/authValidators";

/**
 * LoginFeature Component (Smart/Feature Orchestrator).
 *
 * This component acts as the bridge between the UI (LoginForm) and the business logic
 * (AuthContext, Validation, Notifications). It handles the lifecycle of the login
 * process, from user input to post-authentication redirection.
 *
 * **Architectural Strategy**:
 * - **Separation of Concerns**: It manages stateful logic and side effects, keeping
 * the View (LoginForm) purely presentational.
 * - **Post-Login Recovery**: Uses React Router's `location.state` to redirect users
 * back to their original destination (Deep Linking).
 * - **Feedback Management**: Coordinates toast notifications for both success and error states.
 *
 * @component
 * @category Features/User
 * @returns {JSX.Element} The orchestrated LoginForm with full business logic integration.
 */
const LoginFeature = () => {
  const { login } = useAuth();
  const { showToast } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Navigation Recovery:
   * Determines the redirection target after a successful login.
   * Defaults to '/profile' if no previous intent was captured by ProtectedRoute.
   */
  const from = location.state?.from?.pathname || "/profile";

  /**
   * Form Logic Hook:
   * Encapsulates real-time validation and input state management.
   */
  const { values, errors, handleChange, isValid } = useFormValidation(
    { email: "", password: "" },
    validateLogin
  );

  /**
   * Submission Handler:
   * Orchestrates the asynchronous login flow and side effects.
   * @param {React.FormEvent} e - Form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Client-side validation guard
    if (!isValid()) return;

    setIsLoading(true);
    try {
      console.log("[LoginFeature]: Attempting login for", values.email);

      // 2. Domain logic execution
      await login(values.email, values.password);

      // 3. Success Feedback
      showToast("Welcome back! You have logged in successfully.", "success");

      // 4. Navigation: Redirects to the captured 'from' location, replacing
      // the login entry in history to prevent 'back button' loops.
      navigate(from, { replace: true });
    } catch (err) {
      console.error("[LoginFeature Error]:", err.message);

      // 5. Error Feedback: Provides contextual information to the user
      showToast(
        err.message || "Invalid credentials. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginForm
      values={values}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

export default LoginFeature;
