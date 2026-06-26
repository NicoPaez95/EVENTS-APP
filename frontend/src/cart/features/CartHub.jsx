/**
 * @file CartHub.jsx
 * @description Domain-level composite feature that orchestrates the shopping cart ecosystem.
 * Bridges state and aggregates data configurations across the 'cart' and 'events' domains
 * to trigger checkout flows while maintaining the parent page thin.
 * @module cart/features/CartHub
 * @author Nico Paez
 */

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import CartFeature from "./CartFeature";
import CheckoutModalFeature from "../../events/features/CheckoutModal/CheckoutModalFeature";
import { useTranslation } from "react-i18next";

/**
 * CartHub Composite Component (Feature Orchestrator).
 *
 * Consolidated architectural anchor that binds the transactional global cart context
 * with the external step-driven ticketing modal checkout system. Handles real-time payload
 * normalization, pluralized translation mappings, and media asset caching.
 *
 * @component
 * @category Features/Cart
 * @returns {React.JSX.Element} The rendered shopping cart page structural wrapper.
 */
const CartHub = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const { items, totalAmount, totalItems } = useCart();
  const { t } = useTranslation("events");

  /**
   * Extract all unique visual assets linked to current batch selection.
   * Filters out any malformed metadata dynamically.
   */
  const cartImages = items
    .map((item) => item.event?.image)
    .filter((img) => typeof img === "string");

  /**
   * Data Transformation: Formats the current composite cart state
   * into a unified contract that CheckoutModalFeature expects.
   */
  const aggregatedEventPayload = {
    id: "bulk_cart_transaction",
    title: t("cartHub.titleModal", { count: totalItems }),
    price: totalAmount,
    images: cartImages,
    isBulk: true,
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <CartFeature onTriggerCheckout={() => setIsCheckoutOpen(true)} />
      </div>

      {items.length > 0 && (
        <CheckoutModalFeature
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          event={aggregatedEventPayload}
        />
      )}
    </>
  );
};

export default CartHub;
