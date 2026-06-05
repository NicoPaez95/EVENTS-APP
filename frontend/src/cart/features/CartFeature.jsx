/**
 * @file CartFeature.jsx
 * @description Orchestrates the complex transactional cart review view. Coordinates session calculations,
 * volume mutations, and ties the entire bundle collection into the standard CheckoutModal orchestrator.
 * @module features/user/CartFeature
 * @author Nico Paez
 */

import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import CartList from "../components/CartList";

const CartFeature = ({ onTriggerCheckout }) => {
  const navigate = useNavigate();
  const { items, totalAmount, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <CartList
        items={items}
        totalAmount={totalAmount}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={onTriggerCheckout}
        onExplore={() => navigate("/")}
      />
    </div>
  );
};

export default CartFeature;
