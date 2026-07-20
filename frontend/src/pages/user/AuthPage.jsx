/**
 * @file AuthPage.jsx
 * @description Page entry point for the authentication layout ecosystem (/login and /register).
 * Adheres to the strict Thin Page Pattern by delegating routing context and form views to domain hubs.
 * @module pages/user/AuthPage
 * @author Nico Paez
 */

import React from "react";
import UserAuthHub from "../../user/features/UserAuthHub";

/**
 * Auth Page Component.
 *
 * This component serves strictly as a declarative layout wrapper for the system routing tree.
 * Its sole responsibility is centering and hosting the autonomous UserAuthHub component.
 *
 * @component
 * @category Pages
 * @returns {React.JSX.Element} The clean structural shell hosting the security authentication view.
 */
const AuthPage = () => {
  return (
    <main className="min-h-screen bg-surface-page flex flex-col justify-center py-20 px-4">
      <UserAuthHub />
    </main>
  );
};

export default AuthPage;
