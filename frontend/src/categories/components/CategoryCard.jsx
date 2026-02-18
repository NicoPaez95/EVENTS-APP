// ===============================
// CategoryCard Component
// -------------------------------
// Displays basic information
// about a single category.
//
// Pure presentational component.
// ===============================

const CategoryCard = ({ title }) => {
    return (
        <article>
            <h3>{title}</h3>
        </article>
    );
};

export default CategoryCard;
