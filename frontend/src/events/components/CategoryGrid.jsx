import CategoryCard from "./CategoryCard";

/**
 * CategoryGrid Component (Presentational).
 * * A stateless container component that renders a responsive collection of CategoryCards.
 * It follows the "Dumb Component" pattern, remaining decoupled from the global state (Context)
 * by receiving its data and event handlers strictly via props.
 * * @component
 * @category Components
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.categories - Array of category objects to be rendered.
 * @param {string|number} props.categories[].id - Unique identifier for each category.
 * @param {string} props.categories[].title - Display name for the category card.
 * @param {string} props.category[].key -Asset mapper key identification string used to fetch the background thumbnail.
 * @param {Function} [props.onCategoryClick] - Optional callback triggered when a category is selected.
 * Receives the category title as its first argument.
 * @returns {JSX.Element} A flexible section containing the mapped list of CategoryCards.
 */
const CategoryGrid = ({ categories = [], onCategoryClick }) => {
  return (
    <section
      className="flex flex-wrap justify-center gap-4 p-4"
      aria-label="Event categories selection"
    >
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          title={category.title}
          imagekey={category.key}
          /**
           * Anonymous function used to isolate and bubble up only
           * the necessary data (title) to the parent Feature.
           */
          onClick={() => onCategoryClick?.(category.title)}
        />
      ))}
    </section>
  );
};

export default CategoryGrid;
