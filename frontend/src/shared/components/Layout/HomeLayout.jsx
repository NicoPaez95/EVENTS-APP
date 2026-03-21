import Sidebar from "./Sidebar";

/**
 * Shared Layout Component.
 * * This component provides a responsive grid architecture for the Home page 
 * and related views. It establishes a primary content area and a persistent sidebar.
 * * Architectural Note:
 * Following the migration to Context API, this layout is now strictly structural. 
 * It no longer manages or drills event data, allowing its children and the 
 * Sidebar to consume global state independently.
 * * @component
 * @category Components/Layout
 * @param {Object} props - Component properties.
 * @param {import("react").ReactNode} props.children - Dynamic content to be rendered in the main section.
 * @returns {JSX.Element} A structured responsive grid layout.
 */
const HomeLayout = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      
      {/**
       * Responsive Grid System:
       * Uses a 12-column grid on large screens (lg) to balance content and sidebar.
       * Mobile view defaults to a single-column stacked layout.
       */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Area: Occupies 75% (9/12) of the horizontal space on desktop */}
        <main 
          className="lg:col-span-9 space-y-10"
          role="main"
        >
          {children}
        </main>

        {/* Persistent Sidebar Area: Occupies 25% (3/12) of the horizontal space on desktop */}
        <aside 
          className="lg:col-span-3"
          role="complementary"
        >
          <Sidebar />
        </aside>

      </div>
      
    </div>
  );
};

export default HomeLayout;