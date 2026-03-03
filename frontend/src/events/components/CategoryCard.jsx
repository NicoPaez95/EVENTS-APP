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
        <article  className="bg-sky-100 border-2 border-solid border-slate-500 p-4">
            <h3>{title}</h3>
        </article>
    );
};

export default CategoryCard;
