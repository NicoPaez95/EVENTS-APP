import { upcomingEvents } from '../data/upcomingEvents.mock';
import UpcomingEvents from '../components/UpcomingEvents';

/**
 * UpcomingEventsFeature Component.
 * * This feature-level container is responsible for sourcing and injecting 
 * the chronological event data into the UpcomingEvents presentation component.
 * * It isolates the data retrieval logic from the UI, allowing the 
 * display list to remain generic and reusable across the app.
 * * @component
 * @returns {JSX.Element} The presentational UpcomingEvents component populated with mock data.
 */
const UpcomingEventsFeature = () => {
  return (
    /* The component is wrapped in the feature layer to allow for future 
       logic implementation, such as real-time countdowns or 
       date-based filtering, without affecting the UI layer.
    */
    <UpcomingEvents events={upcomingEvents} />
  );
};

export default UpcomingEventsFeature;