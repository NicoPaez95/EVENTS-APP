import WeatherFeature from "../../../events/features/WeatherFeature";
import UpcomingSidebarFeature from "../../../events/features/UpcomingSidebarFeature";
import RecommendedEventsFeature from "../../../events/features/RecommendedEventsFeature";
import SavedEventsCalendar from "../../../user/components/SavedEventsCalendar";

/**
 * Sidebar Component.
 * * A composite layer that aggregates auxiliary features for the main application layout.
 * It serves as a structural orchestrator for secondary widgets, such as weather 
 * updates, upcoming event summaries, curated recommendations, and user-specific calendars.
 * * Architectural Note:
 * Following the Context API migration, this component no longer requires 
 * manual prop drilling. Each internal Feature is now self-sufficient, 
 * independently retrieving its required data.
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
      A &quot;Smart&quot; orchestrator that filters the global event catalog 
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
      or &quot;favorite&quot; events from the user&apos;s personal domain.
    */}
    <SavedEventsCalendar />
    
  </div>
);

export default Sidebar;