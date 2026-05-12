import { useLocation } from "react-router-dom";
import AuthCard from "../../user/components/AuthCard";
import AuthLogo from "../../user/components/AuthLogo";
import AuthFooterNav from "../../user/components/AuthFooterNav";
import LoginFeature from "../../user/features/LoginFeature";
import RegisterFeature from "../../user/features/RegisterFeature";

/**
 * Auth Page Component.
 *
 * This component serves as the unified entry point for authentication flows (Login and Registration).
 * It manages the structural layout of the auth domain, ensuring a distraction-free environment.
 *
 * Architectural Strategy:
 * - Domain Context: Uses the 'pathname' to toggle between Auth states (Login vs. Register).
 * - Component Composition: Instead of handling styles directly, it uses Domain UI
 *   components (AuthCard, AuthLogo) to define the visual "stage".
 * - Feature Orchestration: Injects the specific business logic features (LoginFeature
 *   or RegisterFeature) into the presentational shell.
 *
 * @component
 * @category Pages
 * @returns {JSX.Element} The rendered Authentication page with conditional feature rendering.
 */
const Auth = () => {
  const { pathname } = useLocation();

  /**
   * Local Routing Logic:
   * Determines the current mode based on the URL path.
   */
  const isLogin = pathname === "/login";

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-center py-20 px-4">
      {/* Domain UI Component: Renders the high-level branding/logo */}
      <AuthLogo />

      <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
        {/* Domain UI Component: Provides the consistent card-like container for auth forms */}
        <AuthCard
          title={isLogin ? "Welcome Back" : "Create Account"}
          subtitle={
            isLogin
              ? "Enter details to access your account"
              : "Join our community of seekers"
          }
        >
          {/* Feature Layer: Injects the smart component responsible for form logic and API calls */}
          {isLogin ? <LoginFeature /> : <RegisterFeature />}
        </AuthCard>

        {/* Domain UI Component: Navigation links to switch between Auth modes */}
        <AuthFooterNav isLogin={isLogin} />
      </div>
    </main>
  );
};

export default Auth;
