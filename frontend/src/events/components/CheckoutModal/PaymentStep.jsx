import React from "react";
import PrimaryButton from "shared/components/UI/PrimaryButton";

/**
 * @typedef {Object} PaymentData
 * @property {string} cardNumber - The formatted card number string.
 * @property {string} expiry - The MM/YY expiration date.
 * @property {string} cvc - The 3 or 4 digit security code.
 */

/**
 * PaymentStep Component.
 * * This presentational component renders the payment form, including a 3D-flipping
 * credit card visualization and input fields for transaction data.
 *
 * @component
 * @category Components/Events/Checkout
 * * @param {Object} props - Component props.
 * @param {PaymentData} props.paymentData - Object containing the current payment field values.
 * @param {number} props.totalAmount - The final price to be displayed on the payment button.
 * @param {Function} props.onUpdate - Callback triggered on input change to update the parent state.
 * @param {Function} props.onNext - Callback to trigger the payment processing simulation.
 * @param {Function} props.onPrev - Callback to return to the previous step (Quantity selection).
 * @param {string|null} props.error - Error message string to be displayed in the alert banner.
 * @param {boolean} props.isFlipped - Boolean state that controls the 3D card rotation.
 * @param {Function} props.setIsFlipped - State setter to toggle the card's visual orientation.
 * * @returns {JSX.Element} The rendered payment step interface.
 */
const PaymentStep = ({
  paymentData,
  totalAmount,
  onUpdate,
  onNext,
  onPrev,
  error,
  isFlipped,
  setIsFlipped,
}) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {/* 1. VISUAL CARD ANIMATION (3D FLIP) */}
      <div className="perspective-1000 w-full h-44 mb-8">
        <div
          className={`relative w-full h-full transition-all duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
        >
          {/* FRONT SIDE */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-gray-800 to-gray-950 rounded-2xl p-6 text-white shadow-2xl flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="w-10 h-7 bg-amber-400/20 rounded border border-amber-400/40" />
              <span className="font-bold italic text-gray-400">VISA</span>
            </div>

            <p className="text-xl font-mono tracking-[0.25em] text-center">
              {paymentData.cardNumber || "•••• •••• •••• ••••"}
            </p>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[9px] uppercase text-gray-400 mb-0.5">
                  Card Holder
                </p>
                <p className="text-xs font-medium tracking-widest uppercase">
                  DEMO USER
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase text-gray-400 mb-0.5">
                  Expires
                </p>
                <p className="text-sm font-mono">
                  {paymentData.expiry || "MM/YY"}
                </p>
              </div>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gray-800 rounded-2xl py-6 text-white shadow-2xl flex flex-col">
            <div className="w-full h-10 bg-black/80 mb-4" />
            <div className="px-6">
              <p className="text-[8px] text-right text-gray-400 uppercase mb-1">
                Security Code
              </p>
              <div className="bg-gray-300 h-9 rounded flex items-center justify-end px-4">
                <span className="text-gray-900 font-mono font-bold italic tracking-widest">
                  {paymentData.cvc || "•••"}
                </span>
              </div>
              <div className="mt-4 opacity-20">
                <div className="h-1 w-full bg-gray-400 rounded-full mb-1" />
                <div className="h-1 w-3/4 bg-gray-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DEMO HINT BANNER */}
      <div className="mb-6 p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-3">
        <span className="text-lg">ℹ️</span>
        <p className="text-[11px] text-blue-800 leading-tight">
          <strong>Demo:</strong> Use{" "}
          <code className="font-bold bg-blue-100 px-1">4242</code> to succeed or{" "}
          <code className="font-bold bg-blue-100 px-1">4000</code> to test
          errors.
        </p>
      </div>

      {/* 3. ERROR ALERT */}
      {error && (
        <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded-r-lg animate-in shake-x duration-300">
          <p className="font-bold">Payment Error</p>
          <p>{error}</p>
        </div>
      )}

      {/* 4. INPUTS FORM */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Card Number"
            value={paymentData.cardNumber}
            onFocus={() => setIsFlipped(false)}
            onChange={(e) => onUpdate({ cardNumber: e.target.value })}
            className={`w-full p-4 bg-gray-50 border rounded-xl outline-none transition-all focus:ring-2 ${
              error
                ? "border-red-200 focus:ring-red-100"
                : "border-gray-200 focus:ring-blue-100"
            }`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="MM/YY"
            value={paymentData.expiry}
            onFocus={() => setIsFlipped(false)}
            onChange={(e) => onUpdate({ expiry: e.target.value })}
            className="p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
          />
          <input
            type="text"
            placeholder="CVC"
            value={paymentData.cvc}
            onFocus={() => setIsFlipped(true)}
            onChange={(e) => onUpdate({ cvc: e.target.value })}
            className="p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* 5. FOOTER BUTTONS */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={onPrev}
          className="flex-1 py-4 text-gray-400 font-bold hover:bg-gray-50 rounded-xl transition-colors"
        >
          Back
        </button>
        <PrimaryButton
          onClick={onNext}
          fullWidth={false}
          className="flex-[2]" // Mantenemos la proporción que tenías
        >
          Pay ${totalAmount}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default PaymentStep;
