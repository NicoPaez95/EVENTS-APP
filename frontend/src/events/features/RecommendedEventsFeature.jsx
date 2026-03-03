// ==========================================
// RecommendedEventsFeature Component
// ------------------------------------------
// Feature-level component responsible for
// providing recommended events data to the
// RecommendedEvents presentational component.
//
// Acts as a container layer between
// mock/data source and UI.
//
// This is NOT a pure UI component.
// It handles data sourcing and passes it
// down as props.
//
// Current data source:
// - recommendedEvents.mock.js
// ==========================================

import { recommendedEvents } from '../data/recommendedEvents.mock';
import RecommendedEvents from '../components/RecommendedEvents';

const RecommendedEventsFeature = () => {
  return (
    <section className="w-full">
      <RecommendedEvents events={recommendedEvents} />
    </section>
  );
};

export default RecommendedEventsFeature;