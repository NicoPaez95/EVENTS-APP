import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../user/hooks/useAuth";

/**
 * ProtectedRoute Component (Security Guard).
 *
 * A higher-order security wrapper designed to restrict access to private application
 * domains. It acts as a gateway that synchronizes the routing state with the
 * user's authentication status.
 *
 * **Core Security Logic**:
 * 1. **Grant Access**: If `isAuthenticated` is true, it acts as a transparent
 * pass-through for the protected children.
 * 2. **Navigation Interception**: If unauthenticated, it interrupts the flow
 * and performs a declarative redirect to the `/login` route.
 * 3. **Intent Preservation**: It attaches the current `location` object to
 * the redirect state, enabling "Deep Link Recovery" after a successful login.
 *
 * @component
 * @category Components/Security
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The private components/pages to be shielded.
 * @returns {React.ReactNode} The original children or a <Navigate /> component.
 */
const ProtectedRoute = ({ children }) => {
  /**
   * Auth Domain Consumption:
   * Retrieves the live authentication state from the global UserContext.
   */
  const { isAuthenticated } = useAuth();

  /**
   * Location Context:
   * Captures the specific URL path the user attempted to access.
   */
  const location = useLocation();

  /**
   * Security Enforcement:
   * If the session is invalid, we perform a redirect using 'replace' to
   * keep the browser history stack clean (avoiding a redirect loop on 'back' click).
   * * 'state={{ from: location }}' is critical for the post-login redirect logic
   * in the LoginFeature.
   */
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  /**
   * Access Granted:
   * Renders the shielded content.
   */
  return children;
};

export default ProtectedRoute;
