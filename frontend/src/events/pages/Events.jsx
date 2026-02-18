// ===============================
// Events Page
// -------------------------------
// Main page responsible for rendering
// the list of available events.
//
// This component acts as the entry point
// for the "events" feature domain.
// ===============================

import { events } from '../data/events.mock';
import EventGrid from '../components/EventGrid';

const Events = () => {
  return (
    <main>
      <h1 className="text-2xl font-bold text-center p-4 m-2">Events</h1>

      {/* EventGrid receives event data as props */}
      <EventGrid events={events} />
    </main>
  );
};

export default Events;
