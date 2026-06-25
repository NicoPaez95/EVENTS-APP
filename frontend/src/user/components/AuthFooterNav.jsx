import { Link } from "react-router-dom";

/**
 * AuthFooterNav Component (Presentational).
 *
 * This is a Domain UI component that provides contextual navigation at the bottom
 * of the authentication screens. It facilitates the transition between the
 * Login and Registration flows using localized texts injected from the parent container.
 *
 * **Architectural Strategy**:
 * - **Decoupled Navigation**: Isolates the "Switch Auth Mode" presentation from the main
 *   orchestrator feature to keep it clean and focused.
 * - **Decoupled Localization**: Relies entirely on an injected `i18n` prop dictionary,
 *   preventing direct dependencies on hook bindings inside small presentational components.
 * - **Standardized UI**: Ensures consistent typography and interactive link styles
 *   across all authentication sub-views.
 *
 * @component
 * @category Components/User
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.isLogin - Flag indicating if the current view is the Login page.
 * @param {Object} props.i18n - Pre-translated labels required for rendering.
 * @param {Object} props.i18n.authFooterNav - Localization dictionary specific to this component.
 * @param {string} props.i18n.authFooterNav.notAccount - Text asking the user if they do not have an account.
 * @param {string} props.i18n.authFooterNav.yesAccount - Text asking the user if they already have an account.
 * @param {string} props.i18n.authFooterNav.register - Text trigger to navigate to the registration view.
 * @param {string} props.i18n.authFooterNav.signin - Text trigger to navigate to the login view.
 *
 * @returns {JSX.Element} A stylized paragraph containing a contextual navigation link.
 */
const AuthFooterNav = ({ isLogin, i18n }) => (
  <p className="mt-10 text-center text-sm text-slate-400 font-medium tracking-wide">
    {/* Contextual Question (e.g., "Don't have an account?" vs "Already have an account?") */}
    {isLogin ? i18n.authFooterNav.notAccount : i18n.authFooterNav.yesAccount}

    {/* Navigation Trigger to switch between auth states */}
    <Link
      to={isLogin ? "/register" : "/login"}
      className="text-blue-600 hover:text-blue-700 font-bold underline underline-offset-8 decoration-2 decoration-blue-100 hover:decoration-blue-600 transition-all ml-1"
    >
      {isLogin ? i18n.authFooterNav.register : i18n.authFooterNav.signin}
    </Link>
  </p>
);

export default AuthFooterNav;
