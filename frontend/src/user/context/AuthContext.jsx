import {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { loginUser, registerUser } from "../services/authService";

/**
 * AuthContext Definition.
 * Initialized as null to ensure it's only populated by the AuthProvider.
 */
const AuthContext = createContext(null);

/**
 * Normalizes API response data into a consistent internal User object.
 * @private
 * @param {Object} responseData - Raw data from the Auth service.
 * @returns {Object} Structured user data.
 */
const formatUserData = (responseData) => ({
  id: responseData.userId,
  email: responseData.email,
  name: responseData.name,
  token: responseData.token,
});

/**
 * AuthProvider Component.
 * * The central authority for authentication state. It manages user sessions,
 * persistence via LocalStorage, and exposes high-level auth actions.
 * * **Architectural Features**:
 * 1. **State Hydration**: Automatically restores session from `localStorage` on init.
 * 2. **Performance Optimization**: Memoizes the context value and callbacks to prevent
 * unnecessary re-renders of the component tree.
 * 3. **Error Boundary**: Includes defensive parsing for local storage data.
 * * @component
 * @category Context
 */
export const AuthProvider = ({ children }) => {
  /** * Session Initialization (Hydration).
   * Attempts to sync the 'user' state with browser storage.
   */
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("auth_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("[AuthContext]: Hydration failed.", error);
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = !!user;

  /**
   * Performs user registration and establishes a session.
   * @async
   * @function register
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @throws {Error} If the service request fails.
   */
  const register = useCallback(async (name, email, password) => {
    setIsLoading(true);
    try {
      const responseData = await registerUser(name, email, password);
      const userData = formatUserData(responseData);

      localStorage.setItem("auth_user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("[AuthContext]: Register failed.", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Authenticates an existing user.
   * @async
   * @function login
   * @param {string} email
   * @param {string} password
   * @throws {Error} If credentials or service fail.
   */
  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    try {
      const responseData = await loginUser(email, password);
      const userData = formatUserData(responseData);

      localStorage.setItem("auth_user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("[AuthContext]: Login failed.", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Terminates the current session and clears local storage.
   * @function logout
   */
  const logout = useCallback(() => {
    localStorage.removeItem("auth_user");
    setUser(null);
  }, []);

  /**
   * Memoized Context Value.
   * Prevents re-rendering of all consumers unless the specific auth state changes.
   */
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
 * Custom Hook: useAuthContext.
 * Specialized hook to access Auth state with an built-in provider check.
 * @throws {Error} If used outside of an AuthProvider.
 * @returns {Object} Auth context value.
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
