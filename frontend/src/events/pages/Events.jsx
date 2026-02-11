import { EVENTS } from '../data/events.mock';
import EventGrid from '../components/EventGrid';

const Events = () => {
  return (
    <>
      <h1>Events</h1>
      <EventGrid events={EVENTS} />
    </>
  );
};

export default Events;
