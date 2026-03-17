import CategoryCard from "./CategoryCard";  

/**
 * CategoryGrid Component.
 * * A container component that renders a responsive collection of CategoryCards.
 * * It maps through an array of category objects and handles the layout 
 * using a flexible wrap system with consistent spacing.
 * * @component
 * @category Components
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.categories - Array of category objects to display.
 * @param {string|number} props.categories[].id - Unique identifier for the category.
 * @param {string} props.categories[].title - Display name for the category card.
 * @param {Function} props.onCategoryClick - Callback function that receives the category title when a card is clicked.
 * @returns {JSX.Element} A section containing a mapped list of CategoryCards.
 */
const CategoryGrid = ({ categories = [], onCategoryClick }) => {
    return (
        <section className="flex flex-wrap justify-center gap-4 p-4">
            {categories.map((category) => (
                <CategoryCard 
                    key={category.id} 
                    title={category.title} 
                    onClick={() => onCategoryClick(category.title)}
                />
            ))}
        </section>
    );
}

export default CategoryGrid;