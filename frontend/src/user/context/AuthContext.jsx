import { createContext, useState, useContext, useMemo, useCallback } from 'react';

/**
 * @typedef {Object} User
 * @property {string} id - Unique identifier for the user.
 * @property {string} name - Display name of the user.
 * @property {string} email - Registered email address.
 * @property {string} role - Access level for RBAC (e.g., 'user', 'admin').
 */

/**
 * @typedef {Object} AuthContextValue
 * @property {User|null} user - The current authenticated user object or null if guest.
 * @property {boolean} isAuthenticated - Derived flag for session status.
 * @property {boolean} isLoading - Tracks the status of asynchronous auth operations.
 * @property {function(Object): Promise<void>} login - Orchestrates the login sequence.
 * @property {function(): void} logout - Orchestrates the session termination.
 */

/**
 * Global Authentication Context.
 * * This context serves as the Single Source of Truth for user identity 
 * and session persistence throughout the application lifecycle.
 * * @type {React.Context<AuthContextValue|null>}
 */
const AuthContext = createContext(null);

/**
 * AuthProvider Component.
 * * This provider encapsulates the authentication business logic. 
 * It synchronizes the in-memory React state with the browser's LocalStorage 
 * to ensure sessions persist across page reloads.
 * * @component
 * @category Context
 * @param {Object} props - Component properties.
 * @param {import("react").ReactNode} props.children - Component tree to be wrapped.
 * @returns {JSX.Element} The provider component with memoized session context.
 */
export const AuthProvider = ({ children }) => {
  /**
   * Persistence Initialization:
   * Employs a Lazy Initializer to sync state with LocalStorage.
   * This logic only executes once during the initial mount.
   */
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("[AuthContext]: Hydration failed. LocalStorage data might be corrupted.", error);
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Login Sequence (Mock):
   * Simulates an asynchronous handshake with an identity provider.
   * Upon success, it updates both the persistence layer and the reactive state.
   * * @async
   * @param {Object} credentials - User identification (email, password).
   * @throws {Error} If the credentials do not meet the mock criteria.
   */
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    
    try {
      // Simulate network latency for a realistic UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      /** @type {User} */
      const userData = { 
        id: 'u123', 
        name: 'Nico Paez', 
        email: credentials.email,
        role: 'user'
      };

      // 1. Sync with browser storage
      localStorage.setItem('auth_user', JSON.stringify(userData));
      
      // 2. Sync with React state
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("[AuthContext]: Login operation failed.", error);
      throw new Error("Invalid credentials. Please verify your data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout Sequence:
   * Explicitly clears the identity data from the browser's storage 
   * and resets the application's global state.
   */
  const logout = useCallback(() => {
    localStorage.removeItem('auth_user');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  /**
   * Memoized Provider Value:
   * Prevents downstream consumer components (like ProtectedRoutes or Navbars) 
   * from re-rendering unless a significant change occurs in the session data.
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
 * * Low-level internal utility to consume the raw AuthContext.
 * Note: Components should generally use the 'useAuth' facade hook instead.
 * * @hook
 * @returns {AuthContextValue} The current authentication state and management methods.
 * @throws {Error} If invoked outside the boundary of an AuthProvider.
 */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext failure: The component must be nested within an <AuthProvider />."
    );
  }
  return context;
};