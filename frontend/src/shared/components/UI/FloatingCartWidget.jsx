/**
 * @file FloatingCartWidget.jsx
 * @description Ambient notification layer tracking global transaction entities in real-time.
 * Directly integrates localization hooks to manage layout text boundaries independently.
 * @module shared/components/UI/FloatingCartWidget
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../../cart/context/CartContext";
import { useTranslation } from "react-i18next";

/**
 * @typedef {Object} FloatingCartTranslations
 * @property {string} title - Localized small uppercase header text representing the cart container category name.
 * @property {string} ariaLabel - Localized contextual text string describing structural behaviors to assistive readers.
 */

/**
 * @typedef {Object} SharedNamespaceTranslations
 * @property {FloatingCartTranslations} floatingCart - Translation schema mappings explicitly scoped to the global ambient cart widget.
 */

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
   * Internationalization Hook resolving specific shared platform vocabulary.
   * @type {Object}
   */
  const { t } = useTranslation("shared");

  // Hide widget if user is already browsing the Cart page or completing checkout
  if (totalItems === 0 || location.pathname === "/cart") return null;

  return (
    <button
      onClick={() => navigate("/cart")}
      className="fixed bottom-6 right-6 z-50 bg-slate-900 hover:bg-blue-600 text-white flex items-center gap-3 px-5 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group animate-in fade-in slide-in-from-bottom-4"
      aria-label={`${t("floatingCart.ariaLabel")} (${totalItems})`}
    >
      <div className="relative">
        <span className="text-xl" aria-hidden="true">
          🛒
        </span>
        <span className="absolute -top-2 -right-2 bg-blue-500 text-white font-extrabold text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900 group-hover:bg-slate-900 transition-colors">
          {totalItems}
        </span>
      </div>
      <div className="text-left hidden sm:block border-l border-slate-700 pl-3">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          {t("floatingCart.title")}
        </p>
        <p className="text-xs font-bold text-emerald-400">
          ${totalAmount.toLocaleString()}
        </p>
      </div>
    </button>
  );
};

FloatingCartWidget.propTypes = {};

export default FloatingCartWidget;
