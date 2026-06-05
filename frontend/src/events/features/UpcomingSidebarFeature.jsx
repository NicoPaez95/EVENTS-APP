import { useMemo } from "react";
import { useEvents } from "../hooks/useEvents";
import UpcomingEvents from "../components/UpcomingEvents";
import PageHeader from "shared/components/UI/PageHeader";

/**
 * UpcomingSidebarFeature Component.
 *
 * A "Smart Component" (Feature Orchestrator) that manages the data logic for the
 * upcoming events section in the sidebar.
 *
 * @component
 * @category Features/Events
 * @description
 * **Architectural Strategy**:
 * This feature specifically consumes `allEvents` (the master catalog) instead of
 * the filtered `events` array. This ensures that the sidebar remains persistent
 * and unaffected by user-applied search filters or category selections in the
 * main application view.
 *
 * @hooks
 * - `useEvents`: Accesses the global event context.
 * - `useMemo`: Optimizes performance by memoizing the sliced event list.
 *
 * @returns {JSX.Element|null} The orchestrated sidebar section or null if no data exists.
 */
const UpcomingSidebarFeature = () => {
  /**
   * Global State Consumption:
   * We extract 'allEvents' to ensure the sidebar displays the chronological
   * roadmap regardless of the current search/filter state.
   */
  const { allEvents } = useEvents();

  /**
   * Data Preparation:
   * Slices the master catalog to display the top 5 upcoming events.
   * Memoized to prevent re-calculations during unrelated parent re-renders.
   */
  const sidebarEvents = useMemo(() => {
    return allEvents?.slice(0, 5) || [];
  }, [allEvents]);

  /**
   * Conditional Rendering:
   * Prevents rendering an empty section if the event catalog hasn't loaded
   * or is empty, maintaining a clean UI.
   */
  if (sidebarEvents.length === 0) {
    return null;
  }

  return (
    <section
      className="animate-in fade-in duration-700 space-y-4"
      aria-labelledby="upcoming-sidebar-title"
    >
      {/* Standardized Section Header aligned outside the presentation card */}
      <PageHeader
        id="upcoming-sidebar-title"
        title="Upcoming Events"
        level={3}
        className="px-1"
      />

      {/* Presentational layer containing strictly the collection list card */}
      <UpcomingEvents events={sidebarEvents} />
    </section>
  );
};

export default UpcomingSidebarFeature;
