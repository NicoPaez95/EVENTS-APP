import { useMemo } from "react";
import { useEvents } from "../hooks/useEvents";
import RecommendedEvents from "../components/RecommendedEvents";
import { getRecommendedEvents } from "events/utils/filterEvents";

/**
 * RecommendedEventsFeature Component (Feature Orchestrator).
 * * A specialized "Smart Component" that serves as the data provider for the
 * recommendation engine domain.
 * * @component
 * @category Features/Events
 * @description
 * **Architectural Strategy**:
 * To maintain a consistent User Experience, this component consumes `allEvents`
 * (the master catalog) instead of the filtered `events` array. This decoupling
 * ensures that recommendations stay visible in the sidebar even when the user
 * applies restrictive search filters in the main view.
 * * @returns {JSX.Element|null} The recommended events section or null if empty.
 */
const RecommendedEventsFeature = () => {
  /**
   * Global State Consumption.
   * Extracts the full master list from `EventsContext`.
   */
  const { allEvents } = useEvents();

  /**
   * Memoized Recommendation Logic.
   * * Process:
   * 1. Invokes the `getRecommendedEvents` utility to filter by 'isRecommended' flag.
   * 2. Limits the output to 3 items to preserve sidebar layout integrity.
   * 3. Performance: Only re-computes if the master catalog structure changes.
   * * @type {Array<Object>}
   */
  const recommended = useMemo(() => {
    return getRecommendedEvents(allEvents, { limit: 3 });
  }, [allEvents]);

  /**
   * Defensive Rendering.
   * Returns null to avoid rendering empty headers or containers if the
   * recommendation engine returns no matches.
   */
  if (recommended.length === 0) {
    return null;
  }

  return (
    <section
      className="w-full animate-in fade-in duration-700"
      aria-labelledby="recommended-title"
    >
      <h3
        id="recommended-title"
        className="text-xl font-bold text-slate-800 mb-4 px-1"
      >
        Recommended for you
      </h3>

      {/* Presentational Layer:
          Delegates the UI mapping and styling to the stateless 
          RecommendedEvents presentational component.
      */}
      <RecommendedEvents events={recommended} />
    </section>
  );
};

export default RecommendedEventsFeature;
