import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import HeaderBar from "./HeaderBar";

/**
 * MainLayout Component.
 *
 * This component serves as the primary UI Shell for the application. It defines
 * the global grid system and orchestrates the placement of persistent navigation
 * elements (Header and Sidebar).
 *
 * Architectural Strategy:
 * - Nested Route Hosting: Utilizes the `Outlet` component from react-router-dom
 *   to act as a parent route wrapper, allowing dynamic page content to be
 *   injected into the primary content area.
 * - Flexible Grid System: Employs a dynamic Tailwind grid that adapts based on
 *   the `showSidebar` flag, switching between a multi-column layout for discovery
 *   and a centered, focused layout for details.
 * - Legacy Compatibility: Maintains support for `children` to allow the component
 *   to be used as a traditional wrapper if needed, though `Outlet` is the
 *   preferred method for routed pages.
 *
 * @component
 * @category Components/Shared
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} [props.children] - Manually injected content (optional fallback).
 * @param {boolean} [props.showSidebar=true] - Toggle to enable or disable the sidebar grid.
 *
 * @returns {JSX.Element} The main application layout structure.
 */
const MainLayout = ({ children, showSidebar = true }) => {
  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      {/* Persistent Global Header */}
      <HeaderBar />

      <div
        className={`grid grid-cols-1 ${
          showSidebar ? "lg:grid-cols-12" : "max-w-5xl mx-auto"
        } gap-8`}
      >
        {/* Primary Content Region */}
        <main
          className={
            showSidebar ? "lg:col-span-9 space-y-10" : "w-full space-y-10"
          }
          role="main"
        >
          {/* 
            The Outlet acts as a placeholder for the matched child route.
            This is where Home, Profile, and other pages are rendered.
          */}
          <Outlet />

          {/* 
            Backward compatibility slot for components rendered outside 
            the standard nested route tree.
          */}
          {children}
        </main>

        {/* 
          Conditional Sidebar: 
          Only rendered if the layout configuration allows it (showSidebar={true}).
        */}
        {showSidebar && (
          <aside className="lg:col-span-3" role="complementary">
            <Sidebar />
          </aside>
        )}
      </div>
    </div>
  );
};

export default MainLayout;
