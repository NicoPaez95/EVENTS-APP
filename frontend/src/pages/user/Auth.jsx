import { useLocation } from "react-router-dom";
import LoginFeature from "../../user/features/LoginFeature";
import RegisterFeature from "../../user/features/RegisterFeature";

/**
 * Auth Page Component (Domain Orchestrator).
 * * This component serves as the high-level container for the authentication domain.
 * It manages the conditional rendering of the Login and Registration flows based
 * on the application's routing state.
 * * **Architectural Role**:
 * Acts as a "Wrapper" that provides a unified visual structure (centered layout,
 * background themes) while delegating specific business logic and form handling
 * to the specialized `LoginFeature` and `RegisterFeature` components.
 * * @component
 * @category Pages
 * @returns {JSX.Element} A centered responsive layout containing the active auth feature.
 */
const Auth = () => {
  /**
   * Routing Logic:
   * Determines the authentication mode (Login vs. Register) by analyzing
   * the current URL pathname.
   */
  const { pathname } = useLocation();
  const isLogin = pathname === "/login";

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Feature Container: 
          Dynamically toggles content. The 'sm:max-w-md' constraint ensures 
          form readability and focus across devices. 
      */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-in fade-in zoom-in duration-300">
        {isLogin ? <LoginFeature /> : <RegisterFeature />}
      </div>
    </main>
  );
};

export default Auth;
