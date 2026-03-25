import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * ProtectedRoute Component.
 * * A security wrapper that restricts access to authenticated users only.
 * It consumes the AuthContext to verify the user's session status.
 * * Key Behaviors:
 * 1. If 'isAuthenticated' is true, it renders the requested children (the private page).
 * 2. If 'isAuthenticated' is false, it redirects to the login page using 'Navigate'.
 * 3. It preserves the "from" location in the state so the user can be 
 * redirected back after a successful login.
 * * @component
 * @category Components/User
 * @param {Object} props - Component properties.
 * @param {import("react").ReactNode} props.children - The private component/page to be shielded.
 * @returns {JSX.Element} The children components or a redirection to /login.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  /**
   * Security Check:
   * If the user is not authenticated, we trigger a declarative redirect.
   * 'state={{ from: location }}' allows us to remember where the user 
   * wanted to go (e.g., /profile) before being asked to log in.
   */
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // If authenticated, render the children (the actual private page)
  return children;
};

export default ProtectedRoute;