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
    <div className="w-full">
      <div className="py-6">
        {/* Isolated autonomous ecosystem handles all business and layout orchestration */}
        <EventDetailHub />
      </div>
    </div>
  );
};

export default EventDetailPage;
