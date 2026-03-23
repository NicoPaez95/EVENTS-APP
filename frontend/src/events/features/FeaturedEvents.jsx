import { useEvents } from '../hooks/useEvents';
import FeaturedEventsCarousel from '../components/FeaturedEventsCarousel';

/**
 * FeaturedEvents Feature Component.
 * * This "Smart Component" acts as the domain orchestrator for highlighted content.
 * * Responsibility: 
 * - Consumes the global EventsContext via the useEvents hook.
 * - Executes the business logic for filtering "featured" events.
 * - Manages conditional rendering (Zero-State) to maintain UI integrity.
 * - Delegates all UI rendering to the presentational FeaturedEventsCarousel.
 * * @component
 * @category Features
 * @returns {JSX.Element|null} The orchestrated featured section or null if no data matches.
 */
const FeaturedEvents = () => {
  /**
   * Context Consumption:
   * Accesses the global event collection and the global loading state.
   */
  const { events, loading } = useEvents();

  /**
   * Data Orchestration:
   * Extracts the subset of events intended for the high-impact hero section.
   * Logic: Filter by 'isFeatured' flag and ensure the collection exists.
   */
  const featured = events?.filter((event) => event.isFeatured === true) || [];

  /**
   * Guard Clause (Loading):
   * Prevents layout shift by returning null (or a skeleton) while data is resolving.
   */
  if (loading) return null;

  /**
   * Conditional Rendering (Empty State):
   * If no events are marked as featured, the component unmounts silently
   * to keep the Home page clean.
   */
  if (featured.length === 0) {
    return null;
  }

  return (
    <section 
      aria-labelledby="featured-experiences-title" 
      className="py-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
    >
      <div className="container mx-auto">
        {/* Semantic Header for Screen Readers */}
        <h2 
          id="featured-experiences-title" 
          className="text-2xl font-bold text-slate-900 mb-6 px-4 font-display tracking-tight"
        >
          Featured Experiences
        </h2>
        
        {/* Presentational Layer:
            Delegates the array of filtered events to the atomic Swiper component.
        */}
        <FeaturedEventsCarousel featuredEvents={featured} />
      </div>
    </section>
  );
};

export default FeaturedEvents;