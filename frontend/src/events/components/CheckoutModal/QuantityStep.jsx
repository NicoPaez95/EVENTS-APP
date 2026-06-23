/**
 * @file QuantityStep.jsx
 * @description Presentational step component for managing ticket multi-selection thresholds.
 * Strictly decoupled from internationalization and data mapping state engines.
 * @module components/events/components/CheckoutModal/QuantityStep
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import PrimaryButton from "shared/components/UI/PrimaryButton";
import { formatCurrency } from "../../../shared/utils/paymentFormatter";

/**
 * QuantityStep Component (Presentational).
 *
 * Allows users to select ticket quantities. Integrates PrimaryButton for
 * flow progression to maintain visual consistency in the checkout funnel.
 * Fixes stale arithmetic bugs by correctly providing absolute values instead of relative deltas.
 *
 * @component
 * @category Components/Events/Checkout
 * @param {Object} props - Component properties.
 * @param {Object} props.event - Localized single-language view model event instance.
 * @param {string} props.event.title - Already resolved single-language display title.
 * @param {string} [props.event.location] - Geographical general text location.
 * @param {number} props.event.price - Normalized float representing ticket unit cost.
 * @param {number} props.quantity - Current absolute number of selected tickets.
 * @param {number} props.totalAmount - Computed total financial accumulated multiplier.
 * @param {Function} props.onQuantityChange - State mutator dispatcher expecting absolute numerical updates.
 * @param {Function} props.onNext - Interceptor callback advancing the checkout wizard funnel stage.
 * @param {Object} props.i18n - Explicit translation dictionary slice for visual UI labels.
 * @param {string} props.i18n.load - Feedback string rendered during empty state asset verification fallback.
 * @param {string} props.i18n.admission - General ticket tier display label text.
 * @param {string} props.i18n.formatCurrency - Contextual currency localization suffix identifier.
 * @param {string} [props.i18n.totalCalculation] - Descriptive calculation helper node placement context.
 * @param {string} props.i18n.total - Accumulated payment label design cue.
 * @param {string} props.i18n.confirm - Form completion action text rendered within the submission action trigger.
 * @returns {React.JSX.Element} Pure presentational ticket counting layout view.
 */
const QuantityStep = ({
  event,
  quantity,
  totalAmount,
  onQuantityChange,
  onNext,
  i18n,
}) => {
  if (!event) {
    return (
      <div className="text-center p-10 text-gray-400 animate-pulse">
        {i18n.load}
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Event Header Summary */}
      <div className="mb-6 text-center">
        <h4 className="text-xl font-bold text-gray-900 mb-1">{event.title}</h4>
        <p className="text-sm text-gray-500">{event.location}</p>
      </div>

      {/* Pricing Card */}
      <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="font-bold text-gray-900">{i18n.admission}</p>
            <p className="text-sm text-blue-600 font-medium">
              {formatCurrency(event?.price || 0)}
              {i18n.formatCurrency}
            </p>
          </div>

          {/* Quantity Selector Controls */}
          <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
            <button
              type="button"
              onClick={() => onQuantityChange(quantity - 1)}
              aria-label="Decrease quantity"
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 font-bold transition-colors active:scale-90"
            >
              −
            </button>
            <span
              className="w-4 text-center font-black text-gray-900"
              aria-live="polite"
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onQuantityChange(quantity + 1)}
              aria-label="Increase quantity"
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 font-bold transition-colors active:scale-90"
            >
              +
            </button>
          </div>
        </div>

        {i18n.totalCalculation}
        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
          <span className="text-gray-500 font-medium">{i18n.total}</span>
          <span className="text-2xl font-black text-gray-900">
            {formatCurrency(totalAmount)}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <PrimaryButton onClick={onNext} size="lg">
        {i18n.confirm}
      </PrimaryButton>
    </div>
  );
};

QuantityStep.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    location: PropTypes.string,
    price: PropTypes.number.isRequired,
  }),
  quantity: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    load: PropTypes.string.isRequired,
    admission: PropTypes.string.isRequired,
    formatCurrency: PropTypes.string.isRequired,
    totalCalculation: PropTypes.string,
    total: PropTypes.string.isRequired,
    confirm: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuantityStep;
