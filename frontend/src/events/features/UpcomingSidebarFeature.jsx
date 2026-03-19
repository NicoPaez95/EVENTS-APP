import UpcomingEvents from '../components/UpcomingEvents';

/**
 * UpcomingSidebarFeature Component.
 * * * A feature-level orchestrator designed specifically for the application Sidebar.
 * * It acts as a data bridge, receiving the event collection and preparing it 
 * for the 'UpcomingEvents' presentation component.
 * * This architectural layer allows for future enhancements—such as real-time 
 * countdowns or priority-based sorting—without polluting the UI component.
 * * @component
 * @category Features
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.events - The collection of events to be displayed.
 * @returns {JSX.Element} The presentational UpcomingEvents component with injected data.
 */
const UpcomingSidebarFeature = ({ events = [] }) => {
  /**
   * Data Preparation:
   * Although currently it only forwards the events, this layer is the ideal place 
   * to apply sidebar-specific sorting (e.g., only events in the next 48 hours) 
   * before passing them to the UI.
   */
  const upcomingData = events;

  return (
    /* Structural wrapper to isolate data retrieval from UI rendering. 
       This ensures 'UpcomingEvents' remains a reusable, atomic component.
    */
    <UpcomingSidebarContainer>
       <UpcomingEvents events={upcomingData} />
    </UpcomingSidebarContainer>
  );
};

/**
 * Internal styled wrapper for the Sidebar Feature.
 * @private
 */
const UpcomingSidebarContainer = ({ children }) => (
  <section className="w-full transition-all duration-500 ease-in-out animate-fade-in">
    {children}
  </section>
);

export default UpcomingSidebarFeature;