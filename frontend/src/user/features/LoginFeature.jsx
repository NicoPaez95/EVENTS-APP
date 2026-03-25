import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFormValidation } from '../hooks/useFormValidation';
import LoginForm from '../components/LoginForm';

/**
 * LoginFeature Component.
 * * This "Smart Component" or orchestrator manages the authentication flow. 
 * It handles local state for loading, coordinates form validation, 
 * and executes the login action through the AuthContext.
 * * Architectural Note:
 * It delegates all UI rendering to the 'LoginForm' (Dumb Component), 
 * following the separation of concerns principle.
 * * @component
 * @category Features
 * @returns {JSX.Element} The rendered login orchestrator connecting logic with UI.
 */
const LoginFeature = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Validation Schema:
   * Defines the rules for the login form fields.
   * @param {Object} values - Current form values.
   * @returns {Object} An object containing error messages if any.
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
   * Form Hook Integration:
   * Manages 'values', 'errors', and 'handleChange' logic centrally.
   */
  const { values, errors, handleChange, setErrors, isValid } = useFormValidation(
    { email: '', password: '' },
    validate
  );

  /**
   * Form Submission Handler:
   * Coordinates the asynchronous login process and post-login navigation.
   * @param {Event} e - The form submission event.
   * @async
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Safety check using the validation schema
    if (!isValid()) return;

    setIsLoading(true);
    try {
      console.log("[LoginFeature]: Attempting login for", values.email);
      
      // Execute the login action from AuthContext
      await login(values);
      
      // Success: Redirect the user to the profile or home page
      navigate('/profile');
    } catch (err) {
      console.error("[LoginFeature Error]:", err);
      setErrors({ global: "Invalid credentials. Please try again." });
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