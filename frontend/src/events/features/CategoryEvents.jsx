import { categories } from '../data/categories.mock';
import CategoryGrid from 'events/components/CategoryGrid';

/**
 * CategoryEvents Page Component.
 * * This acts as a high-level container that orchestrates the display 
 * of all available event categories.
 * * It retrieves data from the category mock system and provides it 
 * to the CategoryGrid to maintain a clean separation between data 
 * management and presentation.
 * * @component
 * @returns {JSX.Element} The main page layout for category selection.
 */
const CategoryEvents = () => {
  return (
    <main>
      {/* Page Title: Main heading for the category selection view */}
      <h1 className="text-2xl font-bold text-center p-4 m-2">
        Category
      </h1>

      {/* CategoryGrid: Presentational component that renders the list 
        of categories passed via the 'categories' prop. 
      */}
      <CategoryGrid categories={categories} />
    </main>
  );
};

export default CategoryEvents;