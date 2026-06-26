/**
 * @file CartFeature.jsx
 * @description Orchestrates the complex transactional cart review view. Coordinates session calculations,
 * volume mutations, and ties the entire bundle collection into the standard CheckoutModal orchestrator.
 * @module features/user/CartFeature
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import CartList from "../components/CartList";
import { useTranslation } from "react-i18next";

/**
 * CartFeature Intermediate Container Component.
 *
 * Connects the shared presentational layout layer with the global core transactional hook states.
 * Dynamically binds internationalization mappings for structural tables, buttons, and empty messaging.
 *
 * @component
 * @category Features/Cart
 * @param {Object} props - Component properties.
 * @param {Function} props.onTriggerCheckout - Trigger callback dispatched to slide in the unified checkout surface.
 * @returns {React.JSX.Element} The rendered operational cart feature wrapper.
 */
const CartFeature = ({ onTriggerCheckout }) => {
  const navigate = useNavigate();
  const { items, totalAmount, updateQuantity, removeFromCart } = useCart();
  const { t } = useTranslation("events");

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <CartList
        items={items}
        totalAmount={totalAmount}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={onTriggerCheckout}
        onExplore={() => navigate("/")}
        i18n={{
          empty: t("cartFeature.cartList.empty"),
          PrimaryButton: t("cartFeature.cartList.PrimaryButton"),
          eventPrice: t("cartFeature.cartList.eventPrice"),
          purchaseSummary: t("cartFeature.cartList.purchaseSummary"),
          subTotal: t("cartFeature.cartList.subTotal"),
          serviceCharge: t("cartFeature.cartList.serviceCharge"),
          serviceChargeCosts: t("cartFeature.cartList.serviceChargeCosts"),
          Total: t("cartFeature.cartList.Total"),
          proceedtoPayment: t("cartFeature.cartList.proceedtoPayment"),
        }}
      />
    </div>
  );
};

CartFeature.propTypes = {
  onTriggerCheckout: PropTypes.func.isRequired,
};

export default CartFeature;
