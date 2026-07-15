/**
 * @file AuthFooterNav.jsx
 * @description Presentational component. Provides an access link to facilitate authentication.
 * @module user/components/AuthFooterNav
 * @author Nico Paez
 */
import { Link } from "react-router-dom";

/**
 * AuthFooterNav Component (Presentational).
 *
 * This is a Domain UI component that provides contextual navigation at the bottom
 * of the authentication screens. It facilitates the transition between the
 * Login and Registration flows using localized texts injected from the parent container.
 *
 * @component
 * @category Components/User
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.isLogin - Flag indicating if the current view is the Login page.
 * @param {Object} props.i18n - Pre-translated labels required for rendering.
 *
 * @returns {JSX.Element} A stylized paragraph containing a contextual navigation link.
 */
const AuthFooterNav = ({ isLogin, i18n }) => (
  <p className="mt-10 text-center text-sm text-secondary-muted font-sans font-medium tracking-wide">
    {/* Contextual Question (e.g., "Don't have an account?" vs "Already have an account?") */}
    {isLogin ? i18n.authFooterNav.notAccount : i18n.authFooterNav.yesAccount}

    {/* Navigation Trigger to switch between auth states */}
    <Link
      to={isLogin ? "/register" : "/login"}
      className="text-accent hover:text-accent-hover font-sans font-semibold underline underline-offset-8 decoration-2 decoration-accent-muted hover:decoration-accent-light transition-all ml-1.5"
    >
      {isLogin ? i18n.authFooterNav.register : i18n.authFooterNav.signin}
    </Link>
  </p>
);

export default AuthFooterNav;
