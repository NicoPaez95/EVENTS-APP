/**
 * @file EventDetailPage.jsx
 * @description Routing entry point for the "/events/:id" path.
 * Adheres to the Thin Page Pattern by delegating all composition and logic to domain hubs.
 * @module pages/events/EventDetailPage
 * @author Nico Paez
 */

import React from "react";
import EventDetailHub from "../../events/features/EventDetailHub";

/**
 * Event Detail Page.
 *
 * This component acts strictly as a declarative layout entry wrapper for the routing tree.
 * Its sole responsibility is placing the unified EventDetailHub into the global page layout.
 *
 * @component
 * @category Pages
 * @returns {React.JSX.Element} The clean structural shell hosting the event details workspace.
 */
const EventDetailPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto py-12 px-4">
        {/* Isolated autonomous ecosystem handles all business and layout orchestration */}
        <EventDetailHub />
      </main>
    </div>
  );
};

export default EventDetailPage;
