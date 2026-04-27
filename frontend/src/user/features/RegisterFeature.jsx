import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useFormValidation } from "../hooks/useFormValidation";
import RegisterForm from "../components/RegisterForm";
import { validateRegister } from "user/utils/authValidators";

/**
 * RegisterFeature Component (Smart/Feature Orchestrator).
 *
 * This component orchestrates the user registration lifecycle. It bridges the
 * gap between the presentational `RegisterForm` and the global `AuthContext`,
 * managing asynchronous states and server-side error feedback.
 *
 * **Key Responsibilities**:
 * 1. **Client-side Guarding**: Prevents submission if the `useFormValidation` hook
 * detects invalid inputs.
 * 2. **Domain Integration**: Delegates the actual API call and state persistence
 * to the `register` function from `AuthContext`.
 * 3. **Server Error Handling**: Manages a local `serverError` state to display
 * feedback for issues like "Email already in use".
 * 4. **Success Flow**: Redirects the user to their profile upon successful account creation.
 *
 * @component
 * @category Features/User
 * @returns {JSX.Element} The orchestrated registration flow with error handling.
 */
const RegisterFeature = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  /** * Feature UI State.
   * Tracks loading status and captures non-validation errors (e.g., Server 500 or 409).
   */
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  /** * Form Logic Integration.
   * Encapsulates the 'name', 'email', and 'password' state logic.
   */
  const { values, errors, handleChange, isValid } = useFormValidation(
    { name: "", email: "", password: "" },
    validateRegister
  );

  /**
   * Orchestrates the registration submission.
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
      // Arguments are passed individually as expected by the AuthProvider's register function
      await register(values.name, values.email, values.password);

      // Step 3: Success Navigation
      navigate("/profile");
    } catch (error) {
      // Step 4: Exception Handling
      // Captures the 'throw error' from the service/context layer
      setServerError(error.message);
      console.error("[RegisterFeature Error]:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Global Server Feedback Area: 
          Displays errors that are not field-specific (e.g., connection issues). 
      */}
      {serverError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-xl mb-4 text-center text-sm font-medium animate-in fade-in slide-in-from-top-2"
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
      />
    </>
  );
};

export default RegisterFeature;
