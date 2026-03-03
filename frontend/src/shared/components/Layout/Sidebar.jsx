// ==========================================
// Sidebar Component
// ------------------------------------------
// Composite component responsible for
// rendering secondary content within
// the Home layout.
//
// Aggregates multiple feature-level
// components such as:
// - WeatherFeature
// - UpcomingEventsFeature
// - RecommendedEventsFeature
// - SavedEventsCalendar
//
// This component does NOT handle data
// fetching directly.
// It serves as a composition layer
// for sidebar-related features.
//
// Intended to be used inside HomeLayout.
// ==========================================

import WeatherFeature from "../../../events/features/WeatherFeature";
import UpcomingEventsFeature from "../../../events/features/UpcomingEventsFeature";
import RecommendedEventsFeature from "../../../events/features/RecommendedEventsFeature";
import SavedEventsCalendar from "../../../user/components/SavedEventsCalendar";

const Sidebar = () => (
  <div className="space-y-6">
    <WeatherFeature />
    <UpcomingEventsFeature />
    <RecommendedEventsFeature />
    <SavedEventsCalendar />
  </div>
);

export default Sidebar;