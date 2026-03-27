import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFormValidation } from '../hooks/useFormValidation';
import useNotification from '../hooks/useNotification'; // 1. Hook imported
import LoginForm from '../components/LoginForm';

/**
 * LoginFeature Component.
 * * This "Smart Component" or Feature orchestrates the authentication flow. 
 * It manages form validation logic, handles the asynchronous login process 
 * via AuthContext, and triggers global notifications for user feedback.
 * * Architectural Role:
 * Acts as the data orchestrator between the UI (LoginForm) and the 
 * business logic (useAuth, useNotification, useFormValidation).
 * * @component
 * @category Features
 * @returns {JSX.Element} The orchestrated Login form.
 */
const LoginFeature = () => {
  const { login } = useAuth();
  const { showToast } = useNotification(); // 2. Initialized toast service
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Redirection Logic:
   * Captures the 'from' path sent via location state (e.g., from a ProtectedRoute).
   * Defaults to '/profile' if the user navigated directly to the login page.
   */
  const from = location.state?.from || "/profile";

  /**
   * Validation Schema:
   * Strategy function to define business rules for the login form.
   * @param {Object} values - Current form field values.
   * @returns {Object} Key-value pair of field errors.
   */
  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email format";
    }
    
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    return errors;
  };

  /**
   * Form Management Hook:
   * Handles input synchronization and error state tracking.
   */
  const { values, errors, handleChange, isValid } = useFormValidation(
    { email: '', password: '' },
    validate
  );

  /**
   * Submission Handler:
   * Coordinates the async login process and post-login navigation/notifications.
   * @param {React.FormEvent} e - The form submission event.
   * @async
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 3. Early exit if client-side validation fails
    if (!isValid()) return;

    setIsLoading(true);
    try {
      console.log("[LoginFeature]: Attempting login for", values.email);
      
      // Execute authentication action
      await login(values);
      
      // 4. SUCCESS: Trigger global feedback and navigate
      showToast("Welcome back! You have logged in successfully.", "success");
      
      // Use { replace: true } to prevent the user from going back to the login screen
      navigate(from, { replace: true });
      
    } catch (err) {
      console.error("[LoginFeature Error]:", err);
      
      // 5. ERROR: Trigger global notification with the error message
      // This message comes directly from the 'throw new Error' in AuthContext
      showToast(err.message || "Invalid credentials. Please try again.", "error");
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