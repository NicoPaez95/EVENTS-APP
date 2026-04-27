import { categories } from "../data/categories.mock";
import CategoryGrid from "events/components/CategoryGrid";
import { useEvents } from "../hooks/useEvents";

/**
 * CategoryEvents Feature Component.
 *
 * This "Smart Component" (Orchestrator) manages the category selection logic.
 * It encapsulates the filtering business logic by consuming the global
 * `EventsContext`, allowing it to be dropped into any layout without
 * requiring prop drilling from page-level components.
 *
 * @component
 * @category Features/Events
 * @returns {JSX.Element} A section containing the category selection interface.
 */
const CategoryEvents = () => {
  /**
   * Hook: Global Event State Management.
   * * Extracts `handleCategorySelect` to ensure that interactions within the grid
   * trigger global state updates (e.g., filtering the main event list).
   */
  const { handleCategorySelect } = useEvents();

  return (
    <section aria-labelledby="categories-title" className="py-8">
      {/* Feature Header: 
          Uses id for accessibility matching with aria-labelledby 
      */}
      <h2
        id="categories-title"
        className="text-2xl font-bold text-center p-4 m-2 font-display text-slate-900"
      >
        Browse by Category
      </h2>

      {/* Presentational Layer:
          Delegates the rendering of the grid to the UI component.
          Injects static mock data and the state handler.
      */}
      <CategoryGrid
        categories={categories}
        onCategoryClick={handleCategorySelect}
      />
    </section>
  );
};

export default CategoryEvents;
