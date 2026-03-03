// ==========================================
// HomeLayout Component
// ------------------------------------------
// Shared layout component responsible for
// structuring the main Home page UI.
//
// Provides a responsive grid layout with:
// - Main dynamic content area (children)
// - Persistent Sidebar component
//
// This component does NOT handle business
// logic or data fetching.
// It is purely structural (layout-level).
//
// Reusable across multiple pages.
// ==========================================

import Sidebar from "./Sidebar";

const HomeLayout = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Content Area */}
        <main className="lg:col-span-9 space-y-6">
          {children}
        </main>

        {/* Persistent Sidebar */}
        <aside className="lg:col-span-3">
          <Sidebar />
        </aside>

      </div>
      
    </div>
  );
};

export default HomeLayout;