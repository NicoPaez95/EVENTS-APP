import WeatherFeature from "../../../events/features/WeatherFeature";
import UpcomingEventsFeature from "../../../events/features/UpcomingEventsFeature";
import RecommendedEventsFeature from "../../../events/features/RecommendedEventsFeature";
import SavedEventsCalendar from "../../../user/components/SavedEventsCalendar";

/**
 * Sidebar Component for the main application layout.
 * Acts as a composite layer that aggregates secondary features 
 * such as weather, upcoming events, recommendations, and the user's saved calendar.
 * It does not manage state or data fetching; it purely organizes 
 * feature-level components in a vertical stack.
 * @returns {JSX.Element} A vertically spaced container with sidebar-specific widgets.
 */
const Sidebar = () => (
  <div className="space-y-6">
    <WeatherFeature />
    <UpcomingEventsFeature />
    <RecommendedEventsFeature />
    <SavedEventsCalendar />
  </div>
);

export default Sidebar;