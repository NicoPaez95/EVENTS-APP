import { categories } from '../data/categories.mock';
import CategoryGrid from 'events/components/CategoryGrid';

/**
 * CategoryEvents Feature Component.
 * * This acts as a high-level container that orchestrates the display 
 * of all available event categories.
 * * It retrieves data from the category mock system and provides it 
 * to the CategoryGrid to maintain a clean separation between data 
 * management and presentation.
 * * @component
 * @category Features
 * @param {Object} props - Component properties.
 * @param {Function} props.onCategoryClick - Callback function that bubbles up the selected category title to the parent (Home).
 * @returns {JSX.Element} The main feature section for category selection.
 */
const CategoryEvents = ({ onCategoryClick }) => {
  return (
    <main>
      {/* Page Title: Main heading for the category selection view */}
      <h1 className="text-2xl font-bold text-center p-4 m-2">
        Category
      </h1>

      {/* CategoryGrid: Presentational component that renders the list 
        of categories. It receives the 'categories' data and the 
        click handler to pass it down the component tree.
      */}
      <CategoryGrid 
        categories={categories} 
        onCategoryClick={onCategoryClick} 
      />
    </main>
  );
};

export default CategoryEvents;