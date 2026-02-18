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
        <section>
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
