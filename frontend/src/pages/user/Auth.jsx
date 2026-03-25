import { useLocation } from 'react-router-dom';
import LoginFeature from '../../user/features/LoginFeature';
import RegisterFeature from '../../user/features/RegisterFeature';

/**
 * Auth Page Component.
 * * This component acts as a high-level Orchestrator for the authentication domain. 
 * It serves as a unified entry point for both Login and Registration flows, 
 * dynamically switching its content based on the current URL path.
 * * Architectural Note:
 * By centralizing Auth logic, we ensure a consistent layout for session management. 
 * The component delegates business logic to specialized "Smart" features 
 * (LoginFeature or RegisterFeature) while maintaining a clean, centered UI.
 * * @component
 * @category Pages
 * @returns {JSX.Element} A responsive container that toggles between Login and Register features.
 */
const Auth = () => {
  /**
   * Routing Logic:
   * Extracts the current pathname to determine the user's intent.
   * - '/login' -> Renders the LoginFeature.
   * - '/register' (or others) -> Renders the RegisterFeature.
   */
  const { pathname } = useLocation();
  const isLogin = pathname === '/login';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      
      {/* Header Section: Contextualized titles based on the current route */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 font-display">
          {isLogin ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          {isLogin 
            ? "Access your personal event collection." 
            : "Join the platform to start saving experiences."}
        </p>
      </div>

      {/* Feature Injection Area: 
          Mounts the corresponding "Smart Component" based on isLogin state.
      */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {isLogin ? <LoginFeature /> : <RegisterFeature />}
      </div>
      
    </div>
  );
};

export default Auth;