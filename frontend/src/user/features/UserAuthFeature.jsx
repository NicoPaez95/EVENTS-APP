import { useAuth } from '../hooks/useAuth';
import AuthNav from '../components/AuthNav';

/**
 * UserAuthFeature Component.
 * * This "Smart Component" or orchestrator manages the identity state 
 * for the navigation bar. It bridges the global AuthContext with the 
 * presentational UI, handling data extraction and action delegation.
 * * Architectural Note:
 * By isolating the identity logic here, we keep the HeaderBar structural 
 * and the AuthNav purely presentational (Dumb). This ensures that any 
 * changes to the auth provider won't affect the UI layout.
 * * @component
 * @category Features
 * @returns {JSX.Element} The rendered AuthNav with injected session state and handlers.
 */
const UserAuthFeature = () => {
  /**
   * Data Extraction:
   * Consumes the current authentication status, user data, and 
   * logout action from the specialized useAuth hook.
   */
  const { isAuthenticated, user, logout } = useAuth();

  /**
   * Presentation Delegation:
   * Passes the necessary data down to the "Dumb Component".
   * - userName: Safe navigation (user?.name) ensures no crashes during session transitions.
   * - onLogout: Directly maps the context action to the UI event.
   */
  return (
    <AuthNav 
      isAuthenticated={isAuthenticated} 
      userName={user?.name} 
      onLogout={logout} 
    />
  );
};

export default UserAuthFeature;