import Sidebar from "./Sidebar";
import HeaderBar from "./HeaderBar";

/**
 * HomeLayout Component.
 * * This "Master Layout" provides a responsive 12-column grid architecture 
 * for the platform's core views. It establishes a primary content area 
 * and a persistent sidebar, ensuring structural consistency.
 * * Architectural Note:
 * Following the "Prop-Drilling Free" migration, this layout is strictly 
 * structural. It delegates state consumption to its children and the 
 * Sidebar, which access global contexts (Auth, Events) independently.
 * * @component
 * @category Shared Components/Layout
 * @param {Object} props - Component properties.
 * @param {import("react").ReactNode} props.children - Dynamic content to be injected into the main section.
 * @returns {JSX.Element} A structured responsive grid layout with semantic HTML5 regions.
 */
const HomeLayout = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-6 min-h-screen">
      
      {/* Structural Header: Orchestrates search and identity features */}
      <HeaderBar />
      
      {/**
       * Responsive Grid System:
       * Utilizes a 12-column logic on large screens (lg) to balance information density.
       * - Mobile/Tablet: Stacked single-column layout.
       * - Desktop (lg+): 9/12 for main content, 3/12 for secondary information (Sidebar).
       */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/**
         * Main Content Region: 
         * The primary interaction area for the user. 
         * Includes vertical spacing (space-y-10) to separate injected features.
         */}
        <main 
          className="lg:col-span-9 space-y-10"
          role="main"
        >
          {children}
        </main>

        {/**
         * Sidebar Region: 
         * Complementary area for secondary features (e.g., Calendar, Filters).
         * Remains persistent to provide quick access to utility tools.
         */}
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