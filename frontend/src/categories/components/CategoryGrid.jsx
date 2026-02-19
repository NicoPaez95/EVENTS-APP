// ===============================
// CategoryGrid Component
// -------------------------------
// Displays a grid of category cards.
//
// Receives an array of categories
// and renders a CategoryCard
// for each item.
//
// Container component.
// ===============================

import CategoryCard from "./CategoryCard";  

const CategoryGrid = ({ categories = [] }) => {
    return (
        <section  className="flex flex-wrap justify-center gap-4 p-4">
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
