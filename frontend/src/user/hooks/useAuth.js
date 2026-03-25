import { useAuthContext } from '../context/AuthContext';

/**
 * useAuth Hook (Facade Pattern).
 * * This custom hook acts as the primary interface for authentication data. 
 * It abstracts the complexity of the AuthContext and provides a clean API 
 * for components to consume session state and identity actions.
 * * Architectural Note:
 * Use this hook instead of 'useAuthContext' directly in your features. 
 * It allows for centralized extension of user logic, such as RBAC 
 * (Role-Based Access Control) or session persistence checks.
 * * @hook
 * @category Hooks/User
 * @returns {Object} The augmented authentication state and methods.
 */
export const useAuth = () => {
  /**
   * Core Context Consumption:
   * Retrieves the base state (user, isAuthenticated, login, logout) 
   * from the global provider.
   */
  const auth = useAuthContext();

  /**
   * Augmented Logic:
   * Here we can derive specific permissions or roles without 
   * polluting the global context state.
   */
  const isAdmin = auth.user?.role === 'admin';
  const isGuest = !auth.isAuthenticated;

  return {
    ...auth,
    isAdmin,
    isGuest,
    // Future extensions: hasPermission('editor'), isPremium, etc.
  };
};