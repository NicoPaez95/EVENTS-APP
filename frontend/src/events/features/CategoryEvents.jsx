// ===============================
// CategoryEvents Page
// -------------------------------
// Displays the main category
// selection view for events.
//
// Acts as a container component
// that provides category data
// to the CategoryGrid component.
// ===============================

import { categories } from '../data/categories.mock';
import CategoryGrid from 'events/components/CategoryGrid';

const CategoryEvents = () => {
  return (
    <main>
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-center p-4 m-2">
        Category
      </h1>

      {/* CategoryGrid receives category data as props */}
      <CategoryGrid categories={categories} />
    </main>
  );
};

export default CategoryEvents;