/**
 * @file FloatingCartWidget.jsx
 * @description Ambient notification layer tracking global transaction entities in real-time.
 * Directly integrates localization hooks to manage layout text boundaries independently.
 * @module shared/components/UI/FloatingCartWidget
 * @author Nico Paez
 */

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../../cart/context/CartContext";
import { useTranslation } from "react-i18next";

/**
 * FloatingCartWidget Component.
 *
 * Renders an absolute-positioned navigation micro-interface tracking aggregate items.
 * Directly couples useTranslation because it manages systemic layout text scopes independently.
 *
 * @component
 * @category Shared/UI
 * @returns {React.JSX.Element|null} The interactive widget button or null if criteria are unfulfilled.
 */
const FloatingCartWidget = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems, totalAmount } = useCart();

  /**
   * Internationalization Hook binding the container to the shared workspace.
   * @type {{ t: function(string): string }}
   */
  const { t } = useTranslation("shared");

  // Hide widget if user is already browsing the Cart page or completing checkout
  if (totalItems === 0 || location.pathname === "/cart") return null;

  return (
    <button
      onClick={() => navigate("/cart")}
      className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-50 bg-primary hover:bg-primary-hover flex items-center gap-4 lg:gap-5 px-6 py-5 lg:px-8 lg:py-6 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group animate-in fade-in slide-in-from-bottom-4"
      aria-label={`${t("floatingCart.ariaLabel")} (${totalItems})`}
    >
      <div className="relative flex-shrink-0">
        <span className="text-2xl lg:text-3xl" aria-hidden="true">
          🛒
        </span>

        <span className="absolute -top-2.5 -right-2.5 lg:-top-3 lg:-right-3 bg-accent text-white font-extrabold text-[10px] lg:text-xs w-6 h-6 lg:w-7 lg:h-7 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-primary group-hover:bg-accent-hover transition-colors select-none">
          {totalItems}
        </span>
      </div>

      <div className="text-left hidden sm:block border-l border-secondary-border/30 pl-4 lg:pl-5">
        <p className="text-[10px] lg:text-xs font-bold text-secondary-light uppercase tracking-wider">
          {t("floatingCart.title")}
        </p>
        <p className="text-sm lg:text-base font-bold text-accent mt-0.5">
          ${totalAmount.toLocaleString()}
        </p>
      </div>
    </button>
  );
};

export default FloatingCartWidget;
