import { upcomingEvents } from '../data/upcomingEvents.mock';
import UpcomingEvents from '../components/UpcomingEvents';

const UpcomingEventsFeature = () => {
  return (
    <UpcomingEvents events={upcomingEvents} />
  );
};

export default UpcomingEventsFeature;