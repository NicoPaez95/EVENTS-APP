import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

/**
 * useNotification Hook.
 * * This hook acts as the primary consumer interface for the NotificationContext.
 * It allows any component within the provider's tree to trigger global 
 * UI toasts (success, error, or info) without managing local visibility states.
 * * @hook
 * @category Hooks/UI
 * @returns {import('../context/NotificationContext').NotificationContextValue} The notification service methods.
 * @throws {Error} If the hook is invoked outside of a NotificationProvider.
 */
const useNotification = () => {
  const context = useContext(NotificationContext);
  
  /**
   * Safety Check:
   * Ensures the hook is used within its legal context boundaries to prevent
   * null pointer exceptions during state dispatching.
   */
  if (!context) {
    throw new Error(
      "useNotification execution failed: The hook must be called within a NotificationProvider scope."
    );
  }
  
  return context;
};

export default useNotification;