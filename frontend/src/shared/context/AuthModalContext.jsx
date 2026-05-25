/**
 * @file AuthModalContext.jsx
 * @description Global state provider for the authentication interception modal.
 * Manages only the reactive visibility states to decouple domain logic from routing contexts.
 * @module shared/context/AuthModalContext
 * @author Nico Paez
 */

import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";

/**
 * @typedef {Object} AuthModalContextValue
 * @property {boolean} isOpen - Current reactive state of the warning modal overlay.
 * @property {function(): void} openAuthPrompt - Triggers the visibility of the authentication warning.
 * @property {function(): void} closeAuthPrompt - Hides the warning modal from the active tree view.
 */

const AuthModalContext = createContext(null);

/**
 * AuthModalProvider Component.
 * Pure state provider that manages interception state triggers without router dependencies.
 *
 * @component
 * @category Context
 * @param {Object} props - Component standard properties.
 * @param {React.ReactNode} props.children - Application DOM subtree.
 * @returns {React.JSX.Element} The state provider boundary.
 */
export const AuthModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openAuthPrompt = useCallback(() => setIsOpen(true), []);
  const closeAuthPrompt = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openAuthPrompt, closeAuthPrompt }),
    [isOpen, openAuthPrompt, closeAuthPrompt]
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
};

/**
 * Hook to consume the AuthModalContext safely.
 * @returns {AuthModalContextValue} Context actions and state flags.
 * @throws {Error} If invoked outside its specific Provider boundary.
 */
export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error(
      "useAuthModal execution failed: must be called within an AuthModalProvider framework."
    );
  }
  return context;
};
