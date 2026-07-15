/**
 * @file UserProfileSkeleton.jsx
 * @description Presentational skeleton loader matching the visual footprint of the UserProfileCard.
 * Uses tailwind animations to isolate structural layout loading states cleanly.
 * @module user/components/UserProfileSkeleton
 * @author Nico Paez
 */

import React from "react";

/**
 * UserProfileSkeleton Component.
 *
 * Atomic placeholder mimicking profile dashboard segments to minimize cumulative layout shifts.
 *
 * @component
 * @category Components/User
 * @returns {React.JSX.Element} A pulsing structural layout mockup.
 */
const UserProfileSkeleton = () => {
  return (
    <div
      className="animate-pulse bg-surface p-8 rounded-2xl shadow-sm border border-secondary-border"
      aria-hidden="true"
    >
      {/* Placeholder: Section Main Title */}
      <div className="h-8 bg-secondary/15 rounded-lg w-1/4 mb-6"></div>

      <div className="space-y-6">
        {/* Placeholder: Avatar & Header Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8 pb-6 border-b border-secondary-border">
          {/* Avatar box */}
          <div className="w-16 h-16 bg-secondary/15 rounded-2xl shrink-0"></div>

          {/* Title & Description Mock */}
          <div className="space-y-2 w-full max-w-xs">
            <div className="h-7 bg-secondary/15 rounded-md w-3/4"></div>
            <div className="h-4 bg-secondary/10 rounded-md w-1/2"></div>
          </div>
        </div>

        {/* Placeholder: Data Grid (2 Columns) */}
        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-8">
          {/* Full Name block */}
          <div className="space-y-2">
            <div className="h-3.5 bg-secondary/10 rounded w-1/4"></div>
            <div className="h-5 bg-secondary/15 rounded-md w-2/3"></div>
          </div>

          {/* Email block */}
          <div className="space-y-2">
            <div className="h-3.5 bg-secondary/10 rounded w-1/4"></div>
            <div className="h-5 bg-secondary/15 rounded-md w-4/5"></div>
          </div>
        </div>

        {/* Placeholder: Active Account Footer Badge */}
        <div className="pt-6 border-t border-secondary-border">
          <div className="h-6 bg-secondary/10 rounded-full w-28"></div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
