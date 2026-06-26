/**
 * @file EventCardSkeleton.jsx
 * @description Presentational skeleton loader representing the structural blueprint of an EventCard.
 * Leverages synchronized Tailwind CSS pulse animations to minimize Cumulative Layout Shift (CLS).
 * @module components/events/EventCardSkeleton
 * @author Nico Paez
 */

import React from "react";

/**
 * EventCardSkeleton Presentational Component.
 *
 * Renders a non-interactive, aria-hidden placeholder matching the exact geometric layout footprint
 * of an active domain EventCard asset. Serves as a loading boundary mockup layer.
 *
 * @component
 * @category Components/Events
 * @returns {JSX.Element} A structural pulsing skeleton placeholder card.
 */
const EventCardSkeleton = () => {
  return (
    <div
      className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm animate-pulse flex flex-col h-full"
      aria-hidden="true"
    >
      {/* 1. Structural Media Container Placeholder */}
      <div className="bg-slate-200 h-48 w-full" />

      {/* 2. Operational Information Content Grid Placeholder */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        {/* Meta Taxonomy / Actions Action Bar */}
        <div className="flex justify-between items-center">
          <div className="bg-slate-200 h-4 w-20 rounded-full" />
          <div className="bg-slate-200 h-6 w-6 rounded-full" />
        </div>

        {/* Core Narrative / Typography Title Stack */}
        <div className="space-y-2 flex-grow">
          <div className="bg-slate-200 h-5 w-5/6 rounded-lg" />
          <div className="bg-slate-200 h-5 w-1/2 rounded-lg" />
        </div>

        {/* Logistics Metadata / Temporal & Spatial Footer Partition */}
        <div className="pt-4 border-t border-slate-50 space-y-2">
          {/* Calendar Date Track Placeholder */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-200 h-4 w-4 rounded-md" />
            <div className="bg-slate-200 h-4 w-32 rounded-lg" />
          </div>

          {/* Geographical Venue Boundary Placeholder */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-200 h-4 w-4 rounded-md" />
            <div className="bg-slate-200 h-4 w-24 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;
