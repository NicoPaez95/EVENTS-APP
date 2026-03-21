import { categories } from '../data/categories.mock';
import CategoryGrid from 'events/components/CategoryGrid';
import { useEvents } from '../hooks/useEvents';

/**
 * CategoryEvents Feature Component.
 * * This "Smart Component" orchestrates the category selection experience.
 * It encapsulates the business logic for category filtering by consuming 
 * the global EventsContext, making it completely autonomous and 
 * decoupled from page-level props.
 * * @component
 * @category Features
 * @returns {JSX.Element} The orchestrated category selection section.
 */
const CategoryEvents = () => {
  /**
   * Context Consumption:
   * Retrieves the global handler for category selection. 
   * This ensures that any click on the grid updates the application's 
   * filtered event state globally.
   */
  const { handleCategorySelect } = useEvents();

  return (
    <section aria-labelledby="categories-title">
      {/* Feature Header */}
      <h2 
        id="categories-title"
        className="text-2xl font-bold text-center p-4 m-2 font-display text-slate-900"
      >
        Browse by Category
      </h2>

      {/* Presentational Layer:
        Passes the static mock data and the global context handler 
        to the decoupled Grid component.
      */}
      <CategoryGrid 
        categories={categories} 
        onCategoryClick={handleCategorySelect} 
      />
    </section>
  );
};

export default CategoryEvents;