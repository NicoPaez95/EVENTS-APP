/**
 * @file CartList.jsx
 * @description Presentational layout tree rendering itemized cart lists and operational cost summaries.
 * @module components/user/Cart/CartList
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import PrimaryButton from "shared/components/UI/PrimaryButton";

/**
 * @typedef {Object} CartListI18n
 * @property {string} empty - Localized fallback messaging displayed when layout streams are clean.
 * @property {string} PrimaryButton - Localized conversion string triggering alternative view navigations.
 * @property {string} eventPrice - Sub-item localized pricing identifier suffix tracking individual tickets.
 * @property {string} purchaseSummary - Header structural title text flanking calculation cards.
 * @property {string} subTotal - Itemized summary breakdown row marking base ticket gross calculations.
 * @property {string} serviceCharge - Simulated operational platform contextual fee declaration string.
 * @property {string} serviceChargeCosts - Explicit numeric value text or free system declaration tokens.
 * @property {string} Total - Final net financial commitment header block descriptor.
 * @property {string} proceedtoPayment - Main transactional workflow ignition button title text.
 */

/**
 * CartList Presentational Component.
 *
 * Provides a stateless dual-pane UI system split between dynamic item row mapping streams
 * and final fiscal accumulation summaries. Completely decouples visual template rendering
 * from container logic via structural pass-through action pipelines.
 *
 * @component
 * @category Components/Cart
 * @param {Object} props - Component properties.
 * @param {Array<Object>} props.items - Transactional line collections linking distinct domain events to user selection volumes.
 * @param {number} props.totalAmount - Aggregated gross numeric price valuation derived from active selection states.
 * @param {Function} props.onUpdateQuantity - Direct index modifier hook deployed to step volume targets up or down.
 * @param {Function} props.onRemoveItem - Purge hook deployed to splice out specific item models via structural ids.
 * @param {Function} props.onCheckout - Parent modal synchronization signal launched upon user checkout intentions.
 * @param {Function} props.onExplore - Fallback fallback router invocation triggered when empty states occur.
 * @param {CartListI18n} props.i18n - Strict localization mapping contract provisioning interface elements.
 * @returns {React.JSX.Element} The rendered presentation structure matching cart data states.
 */
const CartList = ({
  items,
  totalAmount,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onExplore,
  i18n,
}) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
        <p className="text-slate-400 text-lg italic">{i18n.empty}</p>
        <PrimaryButton
          onClick={onExplore}
          className="inline-block mt-4 text-sm py-3 px-6 rounded-2xl"
        >
          {i18n.PrimaryButton}
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Items Stream */}
      <div className="lg:col-span-2 space-y-4">
        {items.map(({ event, quantity }) => (
          <div
            key={event.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm gap-4 hover:border-slate-200 transition-all"
          >
            <div className="flex items-center gap-4">
              <img
                src={event.image || "/api/placeholder/100/100"}
                alt={event.title}
                className="w-16 h-16 object-cover rounded-xl bg-slate-50 flex-shrink-0"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {event.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {event.venue?.name} • {event.venue?.city}
                </p>
                <p className="text-xs font-bold text-blue-600 mt-1">
                  ${event.price}
                  {i18n.eventPrice}
                </p>
              </div>
            </div>

            {/* Quantity Controls & Deletion Pipeline */}
            <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6 border-t sm:border-t-0 pt-3 sm:pt-0">
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                <button
                  onClick={() => onUpdateQuantity(event.id, quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded-lg transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(event.id, quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center font-bold text-slate-600 hover:bg-white rounded-lg transition-colors"
                >
                  +
                </button>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-bold text-slate-900 text-sm min-w-[70px] text-right">
                  ${(event.price * quantity).toLocaleString()}
                </span>
                <button
                  onClick={() => onRemoveItem(event.id)}
                  className="text-slate-300 hover:text-red-500 p-2 text-sm transition-colors"
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Transaction Value Breakdown Card */}
      <div className="lg:col-span-1 bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-6">
        <h3 className="font-bold text-slate-900 text-lg tracking-tight">
          {i18n.purchaseSummary}
        </h3>

        <div className="space-y-3 text-sm font-medium border-b border-slate-200 pb-4">
          <div className="flex justify-between text-slate-500">
            <span>{i18n.subTotal} </span>
            <span>${totalAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>{i18n.serviceCharge}</span>
            <span className="text-emerald-600 font-semibold">
              {i18n.serviceChargeCosts}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-baseline">
          <span className="font-bold text-slate-900">{i18n.Total}</span>
          <span className="text-2xl font-black text-slate-900">
            ${totalAmount.toLocaleString()}
          </span>
        </div>

        <PrimaryButton
          onClick={onCheckout}
          className="w-full py-4 rounded-2xl tracking-wide shadow-md"
        >
          {i18n.proceedtoPayment}
        </PrimaryButton>
      </div>
    </div>
  );
};

CartList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      event: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string,
        venue: PropTypes.shape({
          name: PropTypes.string,
          city: PropTypes.string,
        }),
      }).isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  totalAmount: PropTypes.number.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
  onExplore: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    empty: PropTypes.string.isRequired,
    PrimaryButton: PropTypes.string.isRequired,
    eventPrice: PropTypes.string.isRequired,
    purchaseSummary: PropTypes.string.isRequired,
    subTotal: PropTypes.string.isRequired,
    serviceCharge: PropTypes.string.isRequired,
    serviceChargeCosts: PropTypes.string.isRequired,
    Total: PropTypes.string.isRequired,
    proceedtoPayment: PropTypes.string.isRequired,
  }).isRequired,
};

export default CartList;
