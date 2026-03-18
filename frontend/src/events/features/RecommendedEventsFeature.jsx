import RecommendedEvents from '../components/RecommendedEvents';

/**
 * RecommendedEventsFeature Component.
 * * * This feature-level component acts as the data orchestrator for the 
 * recommendations domain.
 * * Instead of fetching data internally, it consumes the event collection 
 * provided by the parent layout, ensuring perfect synchronization with 
 * the global application state.
 * * It filters the collection based on the 'isRecommended' flag and limits 
 * the output to maintain sidebar aesthetics.
 * * @component
 * @category Features
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.events - The collection of events passed down 
 * from the Home/Sidebar hierarchy.
 * @returns {JSX.Element|null} A section wrapping the RecommendedEvents list, 
 * or null if no recommended data is found.
 */
const RecommendedEventsFeature = ({ events }) => {
  /**
   * Filter Strategy:
   * 1. Only include events explicitly marked as 'isRecommended'.
   * 2. Slice the result to the top 3 items to avoid UI clutter in the Sidebar.
   * We use optional chaining and a fallback array to prevent errors if events are undefined.
   */
  const recommended = events
    ?.filter((event) => event.isRecommended === true)
    .slice(0, 3) || [];

  /**
   * Conditional Rendering:
   * Prevents rendering an empty section if no recommendations exist 
   * or if the event list hasn't loaded yet.
   */
  if (recommended.length === 0) {
    return null;
  }

  return (
    <section className="w-full animate-fade-in">
      <RecommendedEvents events={recommended} />
    </section>
  );
};

export default RecommendedEventsFeature;