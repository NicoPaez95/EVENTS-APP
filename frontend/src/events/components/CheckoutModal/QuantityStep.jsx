import React from "react";
import PrimaryButton from "shared/components/UI/PrimaryButton";

/**
 * QuantityStep Component (Presentational).
 *
 * Allows users to select ticket quantities. Integrates PrimaryButton for
 * flow progression to maintain visual consistency in the checkout funnel.
 *
 * @component
 * @category Components/Events/Checkout
 *
 * @param {Object} props - Component props.
 * @param {Object} props.event - Event data (title, location, price).
 * @param {number} props.quantity - Current ticket count.
 * @param {number} props.totalAmount - Calculated price.
 * @param {Function} props.onQuantityChange - Increment/decrement callback.
 * @param {Function} props.onNext - Progression callback.
 *
 * @returns {JSX.Element}
 */
const QuantityStep = ({
  event,
  quantity,
  totalAmount,
  onQuantityChange,
  onNext,
}) => {
  if (!event) {
    return (
      <div className="text-center p-10 text-gray-400 animate-pulse">
        Loading event details...
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
            <p className="font-bold text-gray-900">General Admission</p>
            <p className="text-sm text-blue-600 font-medium">
              ${event?.price?.toLocaleString() || "0"} per ticket
            </p>
          </div>

          {/* Quantity Selector Controls */}
          <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
            <button
              onClick={() => onQuantityChange(-1)}
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
              onClick={() => onQuantityChange(1)}
              aria-label="Increase quantity"
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 font-bold transition-colors active:scale-90"
            >
              +
            </button>
          </div>
        </div>

        {/* Total Calculation Display */}
        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
          <span className="text-gray-500 font-medium">Total</span>
          <span className="text-2xl font-black text-gray-900">
            ${totalAmount?.toLocaleString() || "0"}
          </span>
        </div>
      </div>

      {/* Action Button: Refactored to use PrimaryButton */}
      <PrimaryButton onClick={onNext} size="lg">
        Confirm and Continue
      </PrimaryButton>
    </div>
  );
};

export default QuantityStep;
