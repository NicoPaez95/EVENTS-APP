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
      className="animate-pulse bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
      aria-hidden="true"
    >
      {/* Placeholder: Title / Name Banner */}
      <div className="h-8 bg-slate-200 rounded w-1/4 mb-4"></div>

      {/* Placeholder: Information Row Blocks */}
      <div className="space-y-3">
        <div className="h-4 bg-slate-100 rounded w-1/2"></div>
        <div className="h-4 bg-slate-100 rounded w-1/3"></div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
