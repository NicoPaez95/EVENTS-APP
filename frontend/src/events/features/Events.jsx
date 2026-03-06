import EventGrid from '../components/EventGrid';

/**
 * Events Page Component.
 * * This is the primary view for browsing the event catalog.
 * * It acts as a structural container that receives an array of events 
 * (either the full list or filtered results) and delegates the 
 * rendering to the EventGrid.
 * * @component
 * @param {Object} props - Component properties.
 * @param {Object[]} props.events - The collection of event objects to be displayed.
 * @returns {JSX.Element} The main layout for the events discovery page.
 */
const Events = ({ events }) => {
  return (
    <main>
      {/* Page Heading: Provides the main context for the view */}
      <h1 className="text-2xl font-bold text-center p-4 m-2">
        Events
      </h1>

      {/* EventGrid: Orchestrates the responsive display of individual 
          EventCards based on the 'events' prop data.
      */}
      <EventGrid events={events} />
    </main>
  );
};

export default Events;