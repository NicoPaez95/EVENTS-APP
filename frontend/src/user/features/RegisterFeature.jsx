import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useFormValidation } from '../hooks/useFormValidation';
import RegisterForm from '../components/RegisterForm';

/**
 * RegisterFeature Component.
 * * This "Smart Component" orchestrates the account creation process. 
 * It manages the local loading state, triggers validation logic via hooks, 
 * and communicates with the AuthContext to register the user.
 * * Architectural Note:
 * It currently utilizes the 'login' method as a mock for the registration 
 * process until the backend implementation is completed.
 * * @component
 * @category Features
 * @returns {JSX.Element} The rendered registration orchestrator.
 */
const RegisterFeature = () => {
  const { login } = useAuth(); 
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Validation Schema:
   * Client-side rules for the registration flow.
   * @param {Object} values - Current form fields.
   * @returns {Object} Validation errors.
   */
  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Full name is required";
    }
    
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
   * Form Handling:
   * useFormValidation centralizes the 'onChange' and 'error' state management.
   */
  const { values, errors, handleChange, isValid } = useFormValidation(
    { name: '', email: '', password: '' },
    validate
  );

  /**
   * Submission Handler:
   * Orchestrates the async flow between the UI and the AuthProvider.
   * @param {Event} e - Form submission event.
   * @async
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Safety check using the validation schema
    if (!isValid()) return;

    setIsLoading(true);
    try {
      console.log("[RegisterFeature]: Creating account for", values.name);
      
      /**
       * Note: 'login' is used here to simulate account creation and 
       * immediate session establishment in the mock environment.
       */
      await login({ email: values.email, password: values.password }); 
      
      // Post-registration navigation
      navigate('/profile');
    } catch (error) {
      console.error("[RegisterFeature Error]:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterForm 
      values={values} 
      errors={errors} 
      onChange={handleChange} 
      onSubmit={handleSubmit} 
      isLoading={isLoading} 
    />
  );
};

export default RegisterFeature;