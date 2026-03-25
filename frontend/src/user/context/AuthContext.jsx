import { createContext, useState, useContext, useMemo, useCallback } from 'react';

/**
 * Global Authentication Context.
 * * This context serves as the Single Source of Truth for user identity 
 * and session status across the entire application.
 */
const AuthContext = createContext(null);

/**
 * AuthProvider Component.
 * * High-level provider that encapsulates the authentication logic. 
 * It manages user data, authentication flags, and session actions 
 * (Login/Logout) using a memoized state to optimize re-renders.
 * * @component
 * @category Context
 * @param {Object} props - Component properties.
 * @param {import("react").ReactNode} props.children - Application tree to be wrapped.
 * @returns {JSX.Element} The AuthContext provider with the memoized session state.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = Guest / Unauthenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Login Sequence (Mock):
   * Simulates an asynchronous authentication flow with a backend service.
   * * @param {Object} credentials - User identification (email, password).
   * @async
   */
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    console.log("[AuthContext]: Initiating session for:", credentials.email);
    
    // Simulating network latency
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser({ name: 'Nico Paez', email: credentials.email });
    setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  /**
   * Logout Sequence:
   * Clears the current session and resets the user identity state.
   */
  const logout = useCallback(() => {
    console.log("[AuthContext]: Terminating session.");
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  /**
   * Memoized Provider Value:
   * Prevents unnecessary re-renders of consuming components unless 
   * the user identity or auth status actually changes.
   */
  const value = useMemo(() => ({
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  }), [user, isAuthenticated, isLoading, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * useAuthContext Hook.
 * * Custom hook to consume the AuthContext within the provider's scope.
 * * @returns {Object} The current authentication state and actions.
 * @throws {Error} If used outside of an AuthProvider.
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider scope.");
  }
  return context;
};