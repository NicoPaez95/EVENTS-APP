/**
 * CategoryCard Component.
 * * A pure presentational component that displays a single category's title.
 * * It features a sky-blue background with a solid slate border, 
 * maintaining a consistent UI for category listing.
 * * @component
 * @param {Object} props - Component properties.
 * @param {string} props.title - The name or title of the category to display.
 * @returns {JSX.Element} A styled article element representing the category.
 */
const CategoryCard = ({ title }) => {
    return (
        <article className="bg-sky-100 border-2 border-solid border-slate-500 p-4">
            <h3 className="font-medium text-slate-800">{title}</h3>
        </article>
    );
};

export default CategoryCard;