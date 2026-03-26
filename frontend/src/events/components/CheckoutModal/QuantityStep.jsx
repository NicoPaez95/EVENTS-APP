import React from 'react';

/**
 * QuantityStep Component.
 * * This presentational component allows the user to select the number of tickets
 * for a specific event. It displays event details, price per unit, and 
 * calculates the total amount in real-time.
 *
 * @component
 * @category Components/Events/Checkout
 * * @param {Object} props - Component props.
 * @param {Object} props.event - The event data object containing title, location, and price.
 * @param {number} props.quantity - The current number of tickets selected.
 * @param {number} props.totalAmount - The calculated total price (quantity * price).
 * @param {Function} props.onQuantityChange - Callback function to increment or decrement quantity.
 * @param {Function} props.onNext - Callback function to proceed to the Payment step.
 * * @returns {JSX.Element} The rendered quantity selection interface.
 */
const QuantityStep = ({ event, quantity, totalAmount, onQuantityChange, onNext }) => {
  
  /**
   * Safety check: If the event data is not yet available, 
   * we render a localized loading state.
   */
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
              ${event?.price?.toLocaleString() || '0'} per ticket
            </p>
          </div>

          {/* Quantity Selector Controls */}
          <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-gray-200 shadow-sm">
            <button 
              onClick={() => onQuantityChange(-1)}
              aria-label="Decrease quantity"
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 font-bold transition-colors"
            >
              −
            </button>
            <span className="w-4 text-center font-black text-gray-900" aria-live="polite">
              {quantity}
            </span>
            <button 
              onClick={() => onQuantityChange(1)}
              aria-label="Increase quantity"
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-600 font-bold transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Total Calculation Display */}
        <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
          <span className="text-gray-500 font-medium">Total</span>
          <span className="text-2xl font-black text-gray-900">
            ${totalAmount?.toLocaleString() || '0'}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={onNext}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg active:scale-95"
      >
        Confirm and Continue
      </button>
    </div>
  );
};

export default QuantityStep;