/**
 * @file AuthLogo.jsx
 * @description Presentational branding logo optimized for center-focused layouts inside the authentication flow.
 * @module components/user/AuthLogo
 * @author Nico Paez
 */

import React from "react";
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
 * @returns {React.JSX.Element} The stylized branding logo link for authentication views.
 */
const AuthLogo = () => (
  <div className="sm:mx-auto sm:w-full sm:max-w-lg mb-10 text-center select-none">
    <Link
      to="/"
      className="text-4xl font-black text-accent hover:opacity-80 transition-opacity inline-block tracking-tighter font-display"
    >
      EVENT<span className="text-primary">APP</span>
    </Link>
  </div>
);

export default AuthLogo;
