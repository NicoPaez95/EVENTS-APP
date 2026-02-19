// ===============================
// CategoryEvents Page
// -------------------------------
// Displays the categories page.
//
// Imports mock category data
// and renders the CategoryGrid
// component.
//
// Page-level component.
// ===============================

import { categories } from '../data/categories.mock';
import CategoryGrid from 'categories/components/CategoryGrid';

const CategoryEvents = () => {
  return (
    <main>
      <h1 className="text-2xl font-bold text-center p-4 m-2">
        Category
      </h1>

      {/* CategoryGrid receives category data as props */}
      <CategoryGrid categories={categories} />
    </main>
  );
};

export default CategoryEvents;
