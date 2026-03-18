import Sidebar from "./Sidebar";

/**
 * Shared Layout component for the Home page and similar views.
 * * * Provides a responsive grid structure featuring a main content area 
 * and a persistent sidebar.
 * * Acts as a structural bridge, passing event data from the page level 
 * down to the sidebar features to ensure data synchronization.
 * * @component
 * @param {Object} props - Component properties.
 * @param {import("react").ReactNode} props.children - Dynamic content for the main area (e.g., Search, Grids).
 * @param {Array<Object>} props.events - The collection of event data to be used by sidebar widgets.
 * @returns {JSX.Element} A structured responsive grid layout.
 */
const HomeLayout = ({ children, events }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Content Area: Occupies 9/12 of the grid on large screens */}
        <main className="lg:col-span-9 space-y-6">
          {children}
        </main>

        {/* Persistent Sidebar: Occupies 3/12 of the grid on large screens */}
        <aside className="lg:col-span-3">
          <Sidebar events={events} />
        </aside>

      </div>
      
    </div>
  );
};

export default HomeLayout;