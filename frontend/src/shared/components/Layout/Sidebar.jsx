import WeatherFeature from "../../../events/features/WeatherFeature";
import UpcomingSidebarFeature from "../../../events/features/UpcomingSidebarFeature";
import RecommendedEventsFeature from "../../../events/features/RecommendedEventsFeature";
import SavedEventsCalendar from "../../../user/features/SavedCalendarFeature";

/**
 * Sidebar Component.
 * * A composite layer that aggregates auxiliary features for the main application layout.
 * It serves as a structural orchestrator for secondary widgets, such as weather 
 * updates, upcoming event summaries, curated recommendations, and user-specific calendars.
 * * Architectural Note:
 * This component follows the "Self-Sufficient Feature" pattern. Each internal 
 * widget is responsible for its own data fetching via Context or Hooks, 
 * eliminating the need for prop drilling from the Layout level.
 * * @component
 * @category Shared Components
 * @returns {JSX.Element} A vertically spaced container with autonomous sidebar widgets.
 */
const Sidebar = () => (
  <div 
    className="space-y-8" 
    role="complementary" 
    aria-label="Sidebar highlights and tools"
  >
    {/* WeatherFeature:
        Provides real-time meteorological insights. In this context, it typically 
        defaults to the user's current city or the event's venue location.
    */}
    <WeatherFeature />

    {/* UpcomingSidebarFeature:
        A "Smart" orchestrator that filters the global event catalog 
        to display only the most chronologically relevant entries.
    */}
    <UpcomingSidebarFeature />

    {/* RecommendedEventsFeature:
        Implements personalized suggestion logic based on global 
        event data and user preferences stored in the Context.
    */}
    <RecommendedEventsFeature />

    {/* SavedEventsCalendar:
        A compact, user-centric widget that displays bookmarked 
        or "favorite" events from the user's personal domain.
    */}
    <SavedEventsCalendar />
    
  </div>
);

export default Sidebar;