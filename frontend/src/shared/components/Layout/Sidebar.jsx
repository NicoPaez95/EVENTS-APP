import WeatherFeature from "../../../events/features/WeatherFeature";
import UpcomingEventsFeature from "../../../events/features/UpcomingEventsFeature";
import RecommendedEventsFeature from "../../../events/features/RecommendedEventsFeature";
import SavedEventsCalendar from "../../../user/components/SavedEventsCalendar";

/**
 * Sidebar Component for the main application layout.
 * * * Acts as a composite layer that aggregates secondary features 
 * such as weather, upcoming events, recommendations, and the user's saved calendar.
 * * It serves as a structural container that forwards the necessary 
 * event data to the recommendation engine.
 * * @component
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.events - The global or filtered event collection 
 * used to derive recommendations.
 * @returns {JSX.Element} A vertically spaced container with sidebar-specific widgets.
 */
const Sidebar = ({ events }) => (
  <div className="space-y-6">
    {/* WeatherFeature: Displays real-time weather based on user location */}
    <WeatherFeature />

    {/* UpcomingEventsFeature: Highlights events happening in the next 48 hours */}
    <UpcomingEventsFeature />

    {/* RecommendedEventsFeature: Processes the 'events' prop to show curated suggestions */}
    <RecommendedEventsFeature events={events} />

    {/* SavedEventsCalendar: A compact view of the user's bookmarked events */}
    <SavedEventsCalendar />
  </div>
);

export default Sidebar;