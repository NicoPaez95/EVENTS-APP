import { recommendedEvents } from '../data/recommendedEvents.mock';
import RecommendedEvents from '../components/RecommendedEvents';

/**
 * RecommendedEventsFeature Component.
 * * This feature-level component acts as the data provider and container 
 * for the recommended events section.
 * * It bridges the gap between the data source (mock/API) and the 
 * presentation layer, ensuring that the RecommendedEvents component 
 * remains pure and decoupled from data-fetching logic.
 * * @component
 * @returns {JSX.Element} A full-width section wrapping the presentational RecommendedEvents.
 */
const RecommendedEventsFeature = () => {
  return (
    <section className="w-full">
      {/* The 'recommendedEvents' data is injected here from the mock source.
        This allows the presentational component to focus solely on 
        rendering the list and handling hover states.
      */}
      <RecommendedEvents events={recommendedEvents} />
    </section>
  );
};

export default RecommendedEventsFeature;