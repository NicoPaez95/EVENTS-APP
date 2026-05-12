import { Link } from "react-router-dom";

/**
 * AuthLogo Component (Presentational).
 *
 * This component renders the primary brand identity specifically styled for the
 * authentication flow. Unlike the global HeaderBar logo, this version is
 * optimized for a centered, focused presentation to maintain visual balance
 * in the distraction-free auth layout.
 *
 * Architectural Strategy:
 * - Domain Branding: Provides a high-impact version of the application's logo
 *   to establish context immediately upon entering the Auth Page.
 * - Navigation: Acts as a "Home" trigger, allowing users to exit the auth flow
 *   and return to the discovery feed.
 * - Layout Encapsulation: Handles its own responsive container constraints
 *   (max-width, centering), further simplifying the `Auth.jsx` page structure.
 *
 * @component
 * @category Components/User
 *
 * @returns {JSX.Element} The stylized branding logo link for authentication views.
 */
const AuthLogo = () => (
  <div className="sm:mx-auto sm:w-full sm:max-w-lg mb-10 text-center">
    <Link
      to="/"
      className="text-4xl font-black text-blue-600 hover:opacity-80 transition-opacity inline-block tracking-tighter"
    >
      EVENT<span className="text-slate-800">APP</span>
    </Link>
  </div>
);

export default AuthLogo;
