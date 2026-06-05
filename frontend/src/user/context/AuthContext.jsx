/**
 * @file AuthContext.jsx
 * @description Central authority for authentication state management.
 * Handles user sessions, registration, and persistence logic with automated cache cleanup.
 * @module context/AuthContext
 * @author Nico Paez
 */

import {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { loginUser, registerUser } from "../services/authService";

/**
 * @typedef {Object} UserData
 * @property {string} id - Unique user identifier.
 * @property {string} email - User email address.
 * @property {string} name - User display name.
 * @property {string} token - JWT authentication token.
 */

/**
 * @typedef {Object} AuthContextInterface
 * @property {UserData|null} user - The current authenticated user object.
 * @property {boolean} isAuthenticated - Flag indicating if a session is active.
 * @property {boolean} isLoading - Loading state for async operations.
 * @property {Function} register - Function to create a new account.
 * @property {Function} login - Function to start a new session.
 * @property {Function} logout - Function to end the session and clear cache.
 */

const AuthContext = createContext(null);

/**
 * Normalizes API response data into a consistent internal User object.
 * @private
 * @param {Object} responseData - Raw data from the Auth service.
 * @returns {UserData} Structured user data.
 */
const formatUserData = (responseData) => ({
  id: responseData.userId || responseData.id,
  email: responseData.email,
  name: responseData.name,
  token: responseData.token,
});

/**
 * AuthProvider Component.
 * @component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {JSX.Element}
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("auth_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("[AuthContext] Hydration Error:", error);
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  // Derived state: boolean flag for quick checks
  const isAuthenticated = useMemo(() => !!user, [user]);

  /**
   * Internal wrapper for auth requests to reduce boilerplate.
   * @private
   */
  const handleAuthRequest = useCallback(async (requestFn, ...args) => {
    setIsLoading(true);
    try {
      const responseData = await requestFn(...args);
      const userData = formatUserData(responseData);

      localStorage.setItem("auth_user", JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (error) {
      console.error(`[AuthContext] Operation Failed:`, error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    (name, email, password) =>
      handleAuthRequest(registerUser, name, email, password),
    [handleAuthRequest]
  );

  const login = useCallback(
    (email, password) => handleAuthRequest(loginUser, email, password),
    [handleAuthRequest]
  );

  const logout = useCallback(() => {
    try {
      localStorage.removeItem("auth_user");
      setUser(null);
    } catch (error) {
      console.error("[AuthContext] Logout Error:", error);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      register,
      login,
      logout,
    }),
    [user, isAuthenticated, isLoading, register, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to access AuthContext.
 * @throws {Error} If used outside of AuthProvider.
 * @returns {AuthContextInterface}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
