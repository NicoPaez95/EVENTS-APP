import { useEvents } from 'events/hooks/useEvents';
import UpcomingEvents from '../components/UpcomingEvents';

/**
 * UpcomingSidebarFeature Component.
 * * This "Smart Component" orchestrates the sidebar experience by 
 * retrieving the global event catalog and preparing it for the sidebar UI.
 * * It acts as a data-driven bridge, isolating the complex logic of 
 * sorting or limiting the event list from the presentational 'UpcomingEvents' component.
 * * @component
 * @category Features
 * @returns {JSX.Element} The orchestrated sidebar section with a curated event list.
 */
const UpcomingSidebarFeature = () => {
  /**
   * Data Retrieval and Preparation:
   * Consumes the global event state and applies sidebar-specific constraints.
   * In a production environment, this is where we would implement 
   * chronological sorting or limit the result count (e.g., top 5 upcoming).
   */
  const { events } = useEvents();

  /**
   * Selection Strategy:
   * We slice the first 5 events to prevent the sidebar from becoming 
   * excessively long, ensuring a balanced layout.
   */
  const sidebarEvents = events.slice(0, 5);

  return (
    /**
     * Structural wrapper:
     * Isolates data fetching from UI rendering. This ensures that 
     * 'UpcomingEvents' remains a pure, atomic presentational component.
     */
    <section 
      className="animate-in fade-in duration-700" 
      aria-label="Upcoming events sidebar"
    >
        <UpcomingEvents events={sidebarEvents} />
    </section>
  );
};

export default UpcomingSidebarFeature;