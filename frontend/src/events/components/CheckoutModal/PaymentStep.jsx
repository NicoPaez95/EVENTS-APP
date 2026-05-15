/**
 * @file PaymentStep.jsx
 * @description Presentational form component for managing checkout payment methods.
 * Integrates atomic inputs and custom triggers to handle interactive 3D credit card flipping animations.
 * @module components/checkout/PaymentStep
 * @author Nico Paez
 */

import React from "react";
import PrimaryButton from "shared/components/UI/PrimaryButton";
import PrimaryInput from "shared/components/UI/PrimaryInput";

/**
 * PaymentStep Presentational Component.
 *
 * Renders a high-fidelity checkout form segment including a CSS-driven 3D card layout.
 * Listens to active element focus shifts to flip the card mesh toward its security perspective code view.
 *
 * @component
 * @category Components/Checkout
 * @param {Object} props - Component properties.
 * @param {Object} props.paymentData - Structured domain values capturing active user billing records.
 * @param {string} props.paymentData.cardNumber - Numerical sequence token representation string for the credit card.
 * @param {string} props.paymentData.expiry - Structured date shorthand notation string representing target expiration bounds ("MM/YY").
 * @param {string} props.paymentData.cvc - Card verification value security cipher token.
 * @param {number|string} props.totalAmount - Aggregated numeric value of invoice parameters translated to final checkout cost.
 * @param {function} props.onUpdate - Callback dispatch function triggered when editing field entities. Receives an operational state subset block.
 * @param {function} props.onNext - Pipeline control navigation callback targeting sequential step execution flow.
 * @param {function} props.onPrev - Pipeline control navigation callback targeting historical step backflow.
 * @param {string|null} props.error - Localized descriptive message reporting upstream transaction execution errors.
 * @param {boolean} props.isFlipped - Interactive layout state toggle identifying if the 3D card wrapper mesh exposes its backface.
 * @param {function} props.setIsFlipped - Mutation dispatch callback handler dedicated to altering the spatial flip animation boundary states.
 * @returns {JSX.Element} An interactive payment form accompanied by a dynamic card mesh visualization layer.
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
          <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-gray-800 to-gray-950 rounded-2xl p-6 text-white shadow-2xl flex flex-col justify-between border border-white/10">
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
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gray-800 rounded-2xl py-6 text-white shadow-2xl flex flex-col border border-white/10">
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
            </div>
          </div>
        </div>
      </div>

      {/* 2. DEMO HINT & ERROR ALERT */}
      <div className="space-y-4 mb-6">
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-3">
          <span className="text-lg">ℹ️</span>
          <p className="text-[11px] text-blue-800 leading-tight">
            <strong>Demo:</strong> Use{" "}
            <code className="font-bold bg-blue-100 px-1">4242</code> to succeed.
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded-r-lg animate-in shake-x duration-300">
            <p className="font-bold">Payment Error</p>
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* 3. INPUTS FORM: Using PrimaryInput */}
      <div className="space-y-4">
        <PrimaryInput
          placeholder="Card Number"
          value={paymentData.cardNumber}
          onFocus={() => setIsFlipped(false)}
          onChange={(e) => onUpdate({ cardNumber: e.target.value })}
          error={!!error}
        />

        <div className="grid grid-cols-2 gap-4">
          <PrimaryInput
            placeholder="MM/YY"
            value={paymentData.expiry}
            onFocus={() => setIsFlipped(false)}
            onChange={(e) => onUpdate({ expiry: e.target.value })}
          />
          <PrimaryInput
            placeholder="CVC"
            value={paymentData.cvc}
            onFocus={() => setIsFlipped(true)}
            onChange={(e) => onUpdate({ cvc: e.target.value })}
          />
        </div>
      </div>

      {/* 4. FOOTER BUTTONS */}
      <div className="flex gap-4 mt-8">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 py-4 text-gray-400 font-bold hover:bg-gray-50 rounded-xl transition-colors active:scale-95"
        >
          Back
        </button>
        <PrimaryButton onClick={onNext} fullWidth={false} className="flex-[2]">
          Pay ${totalAmount}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default PaymentStep;
