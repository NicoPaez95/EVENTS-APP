import CategoryCard from "./CategoryCard";  

/**
 * CategoryGrid Component.
 * * A container component that renders a responsive collection of CategoryCards.
 * * It maps through an array of category objects and handles the layout 
 * using a flexible wrap system with consistent spacing.
 * * @component
 * @param {Object} props - Component properties.
 * @param {Object[]} props.categories - Array of category objects to display.
 * @param {string|number} props.categories[].id - Unique identifier for the category.
 * @param {string} props.categories[].title - Display name for the category card.
 * @returns {JSX.Element} A section containing a mapped list of CategoryCards.
 */
const CategoryGrid = ({ categories = [] }) => {
    return (
        <section className="flex flex-wrap justify-center gap-4 p-4">
            {categories.map((category) => (
                <CategoryCard 
                    key={category.id} 
                    title={category.title} 
                />
            ))}
        </section>
    );
}

export default CategoryGrid;