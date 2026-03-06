import Sidebar from "./Sidebar";

/**
 * Shared Layout component for the Home page and similar views.
 * Provides a responsive grid structure featuring a main content area 
 * and a persistent sidebar. It is a purely structural component 
 * with no business logic.
 * @param {object} props - Component properties.
 * @param {import("react").ReactNode} props.children - Dynamic content to be rendered in the main area.
 * @returns {JSX.Element} A structured grid layout with Main and Aside sections.
 */

const HomeLayout = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Content Area: Occupies 9/12 of the grid on large screens */}
        <main className="lg:col-span-9 space-y-6">
          {children}
        </main>

        {/* Persistent Sidebar: Occupies 3/12 of the grid on large screens */}
        <aside className="lg:col-span-3">
          <Sidebar />
        </aside>

      </div>
      
    </div>
  );
};

export default HomeLayout;