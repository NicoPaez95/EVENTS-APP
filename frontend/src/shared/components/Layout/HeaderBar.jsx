import { Link, useLocation } from "react-router-dom";
import UserAuthFeature from "../../../user/features/UserAuthFeature";
import EventDiscoveryFeature from "../../../events/features/EventDiscoveryFeature";

/**
 * HeaderBar Component.
 *
 * This component acts as the primary navigational and branding anchor of the application.
 * It is integrated within the MainLayout and serves as a host for global features.
 *
 * Architectural Strategy:
 * - Routing Awareness: Uses `useLocation` to implement conditional rendering logic,
 *   ensuring that search tools are only visible in appropriate discovery contexts.
 * - Feature Integration: Acts as a "Slot" or "Host" for cross-domain orchestrators
 *   like `EventDiscovery` (Events Domain) and `UserAuthFeature` (User Domain).
 * - Responsive Layout: Employs a flexible flexbox structure that adapts from
 *   stacked mobile views to justified desktop layouts.
 *
 * @component
 * @category Components/Shared
 * @returns {JSX.Element} The adaptive navigation header bar.
 */
const HeaderBar = () => {
  const { pathname } = useLocation();

  /**
   * Visibility Logic:
   * Determines if the EventDiscovery search bar should be rendered.
   * Currently enabled for the Root (Home) and Upcoming Events views.
   */
  const showDiscovery = pathname === "/" || pathname === "/events/upcoming";

  return (
    <header
      className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10"
      role="banner"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-grow">
        {/* Brand Identity: Serves as the primary 'Reset' navigation trigger */}
        <Link
          to="/"
          className="text-2xl font-black text-blue-600 hover:scale-105 transition-transform shrink-0 flex items-center"
        >
          EVENT<span className="text-slate-800">APP</span>
        </Link>

        {/* 
          Conditional Feature Injection: 
          The search discovery feature is injected here only when the route matches 
          discovery-focused pages, maintaining UI focus on detail-heavy pages.
        */}
        {showDiscovery && (
          <div className="w-full animate-in fade-in slide-in-from-left-4 duration-500">
            <EventDiscoveryFeature />
          </div>
        )}
      </div>

      {/* 
        Identity Management Slot: 
        Hosts the UserAuthFeature which manages the Login/Register/Logout state.
      */}
      <div className="flex-shrink-0">
        <UserAuthFeature />
      </div>
    </header>
  );
};

export default HeaderBar;
