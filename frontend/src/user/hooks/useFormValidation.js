import { useState, useCallback } from 'react';

/**
 * useFormValidation Hook.
 * * A specialized utility hook for managing controlled form inputs, 
 * validation states, and error tracking. It decouples form logic 
 * from the UI components.
 * * Architectural Note:
 * This hook implements a "Validation Strategy" pattern by receiving 
 * an external 'validateFn'. This allows the same hook to be reused 
 * across different domains (Auth, Events, Profile) with unique rules.
 * * @hook
 * @category Shared Hooks
 * @param {Object} initialState - The starting values for the form fields.
 * @param {Function} validateFn - Strategy function that returns an errors object.
 * @returns {Object} Form state and event handlers { values, errors, handleChange, handleBlur, setErrors, isValid }.
 */
export const useFormValidation = (initialState, validateFn) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  /**
   * Input Change Handler:
   * Synchronizes the DOM input state with the React state.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  }, []);

  /**
   * Blur Handler:
   * Triggers the validation strategy when the user leaves an input field.
   */
  const handleBlur = useCallback(() => {
    const validationErrors = validateFn(values);
    setErrors(validationErrors);
  }, [values, validateFn]);

  /**
   * Validation Checker:
   * Helper method to verify if the form is currently error-free.
   * @returns {boolean} True if no validation errors exist.
   */
  const isValid = useCallback(() => {
    const validationErrors = validateFn(values);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [values, validateFn]);

  return { 
    values, 
    errors, 
    handleChange, 
    handleBlur, 
    setErrors, 
    isValid 
  };
};