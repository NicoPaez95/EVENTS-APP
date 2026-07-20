/**
 * @file CartPage.jsx
 * @description Page orchestrator that acts as a declarative routing shell hosting the cart layout.
 * Adheres to the strict Thin Page Pattern by delegating composition and transactional logic to domain hubs.
 * @module pages/cart/CartPage
 * @author Nico Paez
 */

import React from "react";
import CartHub from "../../cart/features/CartHub";

/**
 * Cart Page Component.
 *
 * This component serves strictly as a declarative wrapper for the routing tree layout.
 * Its sole responsibility is mounting the autonomous CartHub into the screen view matrix.
 *
 * @component
 * @category Pages
 * @returns {React.JSX.Element} The clean structural shell hosting the cart management workspace.
 */
const CartPage = () => {
  return (
    <main className="min-h-screen bg-surface-page py-12">
      <CartHub />
    </main>
  );
};

export default CartPage;
