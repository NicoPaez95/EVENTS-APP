import { useEvents } from '../hooks/useEvents';
import RecommendedEvents from '../components/RecommendedEvents';

/**
 * RecommendedEventsFeature Component.
 * * This "Smart Component" acts as the data orchestrator for the 
 * recommendations domain.
 * * Following the Context API migration, it now independently consumes 
 * the global event collection via the useEvents hook, ensuring 
 * synchronization without prop drilling.
 * * It filters the collection based on the 'isRecommended' flag and limits 
 * the output to maintain sidebar aesthetics.
 * * @component
 * @category Features
 * @returns {JSX.Element|null} A section wrapping the RecommendedEvents list, 
 * or null if no recommended data is found.
 */
const RecommendedEventsFeature = () => {
  /**
   * Global State Consumption:
   * Retrieves the current event catalog from the EventsContext.
   */
  const { events } = useEvents();

  /**
   * Filter Strategy:
   * 1. Only include events explicitly marked as 'isRecommended'.
   * 2. Slice the result to the top 3 items to avoid UI clutter in the Sidebar.
   * Uses optional chaining to ensure stability during initial data loads.
   */
  const recommended = events
    ?.filter((event) => event.isRecommended === true)
    .slice(0, 3) || [];

  /**
   * Conditional Rendering:
   * If no events match the recommendation criteria, the component 
   * returns null to keep the Sidebar clean and focused.
   */
  if (recommended.length === 0) {
    return null;
  }

  return (
    <section 
      className="w-full animate-in fade-in duration-700"
      aria-labelledby="recommended-title"
    >
      <h3 id="recommended-title" className="sr-only">Recommended for you</h3>
      <RecommendedEvents events={recommended} />
    </section>
  );
};

export default RecommendedEventsFeature;