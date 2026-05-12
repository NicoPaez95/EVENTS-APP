import { Link } from "react-router-dom";

/**
 * AuthFooterNav Component (Presentational).
 *
 * This is a Domain UI component that provides contextual navigation at the bottom
 * of the authentication screens. It facilitates the transition between the
 * Login and Registration flows.
 *
 * Architectural Strategy:
 * - Decoupled Navigation: Isolates the "Switch Auth Mode" logic from the main
 *   Auth Page to keep it clean and focused.
 * - Dynamic Content: Adapts labels and destination routes based on the current
 *   authentication state (Login vs. Register).
 * - Standardized UI: Ensures consistent typography and interactive link styles
 *   across all authentication sub-views.
 *
 * @component
 * @category Components/User
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.isLogin - Flag indicating if the current view is the Login page.
 *
 * @returns {JSX.Element} A stylized paragraph containing a contextual navigation link.
 */
const AuthFooterNav = ({ isLogin }) => (
  <p className="mt-10 text-center text-sm text-slate-400 font-medium tracking-wide">
    {/* Contextual Question */}
    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
    {/* Navigation Trigger */}
    <Link
      to={isLogin ? "/register" : "/login"}
      className="text-blue-600 hover:text-blue-700 font-bold underline underline-offset-8 decoration-2 decoration-blue-100 hover:decoration-blue-600 transition-all"
    >
      {isLogin ? "Register here" : "Sign in"}
    </Link>
  </p>
);

export default AuthFooterNav;
