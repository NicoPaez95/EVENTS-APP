import WeatherFeature from "../../../events/features/WeatherFeature";
import UpcomingSidebarFeature from "../../../events/features/UpcomingSidebarFeature";
import RecommendedEventsFeature from "../../../events/features/RecommendedEventsFeature";
import SavedEventsCalendar from "../../../user/components/SavedEventsCalendar";

/**
 * Sidebar Component.
 * * * Acts as a composite layer that aggregates secondary features for the main application layout.
 * * It serves as a structural container that orchestrates auxiliary widgets 
 * such as weather, upcoming events, recommendations, and the user's saved calendar.
 * * This component ensures data synchronization by forwarding the 'events' collection 
 * to its child feature-orchestrators.
 * * @component
 * @category Shared Components
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.events - The global or filtered event collection 
 * used to derive recommendations and upcoming summaries.
 * @returns {JSX.Element} A vertically spaced container with sidebar-specific feature widgets.
 */
const Sidebar = ({ events }) => (
  <div className="space-y-6" role="complementary" aria-label="Sidebar highlights">
    
    {/* WeatherFeature: Displays real-time weather based on user location */}
    <WeatherFeature />

    {/* UpcomingSidebarFeature: Highlights chronologically close events (Widget view) */}
    <UpcomingSidebarFeature events={events} />

    {/* RecommendedEventsFeature: Processes the 'events' prop to show curated suggestions */}
    <RecommendedEventsFeature events={events} />

    {/* SavedEventsCalendar: A compact view of the user's bookmarked events */}
    <SavedEventsCalendar />
    
  </div>
);

export default Sidebar;