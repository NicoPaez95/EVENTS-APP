import { useMemo } from 'react';
import { useEvents } from '../hooks/useEvents';
import RecommendedEvents from '../components/RecommendedEvents';

/**
 * RecommendedEventsFeature Component.
 * * A "Smart Component" (Feature Orchestrator) that acts as the data provider 
 * for the recommendation domain.
 * * @component
 * @category Features/Events
 * * @description
 * **Architectural Strategy**: 
 * This component specifically consumes `allEvents` (the master catalog) rather than 
 * the filtered `events` array. This ensures that recommendations remain persistent 
 * and visible even when the user applies specific filters or search terms in 
 * the main catalog.
 * * @hooks
 * - `useEvents`: Retrieves the full master event list from the global context.
 * - `useMemo`: Optimizes performance by memoizing the filtered recommendation 
 * list, preventing re-calculations on unrelated UI renders.
 * * @returns {JSX.Element|null} A section wrapping the RecommendedEvents list, 
 * or null if no recommended data is available.
 */
const RecommendedEventsFeature = () => {
  /**
   * Global State Consumption:
   * We extract 'allEvents' to keep the sidebar independent from the 
   * user's current search/filter state in the main grid.
   */
  const { allEvents } = useEvents();

  /**
   * Memoized Filtering Strategy:
   * 1. Filters only events explicitly flagged as 'isRecommended'.
   * 2. Slices the result to the top 3 items to maintain sidebar aesthetics.
   * 3. Dependencies: Only re-runs if the master catalog (allEvents) is updated.
   */
  const recommended = useMemo(() => {
    return allEvents
      ?.filter((event) => event.isRecommended === true)
      .slice(0, 3) || [];
  }, [allEvents]);

  /**
   * Conditional Rendering:
   * If no events match the recommendation criteria, the component 
   * returns null to keep the UI clean and avoid empty placeholders.
   */
  if (recommended.length === 0) {
    return null;
  }

  return (
    <section 
      className="w-full animate-in fade-in duration-700"
      aria-labelledby="recommended-title"
    >
      <h3 id="recommended-title" className="text-xl font-bold text-slate-800 mb-4 px-1">
        Recommended for you
      </h3>
      
      {/* Presentational Layer:
          Delegates the UI rendering to the stateless RecommendedEvents component.
      */}
      <RecommendedEvents events={recommended} />
    </section>
  );
};

export default RecommendedEventsFeature;