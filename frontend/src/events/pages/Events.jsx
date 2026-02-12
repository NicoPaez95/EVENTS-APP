// ===============================
// Events Page
// -------------------------------
// Main page responsible for rendering
// the list of available events.
//
// This component acts as the entry point
// for the "events" feature domain.
// ===============================

import { EVENTS } from '../data/events.mock';
import EventGrid from '../components/EventGrid';

const Events = () => {
  return (
    <main>
      <h1>Events</h1>

      {/* EventGrid receives event data as props */}
      <EventGrid events={EVENTS} />
    </main>
  );
};

export default Events;
