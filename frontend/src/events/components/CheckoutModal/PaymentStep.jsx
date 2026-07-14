/**
 * @file PaymentStep.jsx
 * @description Presentational step component for the billing stage. Dispatches key/value pairs
 * to the parent orchestrator mutation boundaries to guarantee fluid reactive typing.
 * Integrates masking and token limitation utilities to boost financial UX workflows.
 * @module components/events/Checkout/PaymentStep
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import PrimaryButton from "shared/components/UI/PrimaryButton";
import PrimaryInput from "shared/components/UI/PrimaryInput";
import {
  formatCurrency,
  formatCardNumber,
  formatExpiryDate,
  formatCVC,
} from "../../../shared/utils/paymentFormatter";

/**
 * PaymentStep Presentational Component.
 *
 * Renders a high-fidelity checkout form segment including a CSS-driven 3D card layout.
 * Listens to active element focus shifts to flip the card mesh toward its security perspective code view.
 *
 * @component
 * @category Components/Events/Checkout
 * @param {Object} props - Component properties.
 * @param {Object} props.paymentData - Structured domain values capturing active user billing records.
 * @param {string} props.paymentData.cardNumber - Numerical sequence token representation string for the credit card.
 * @param {string} props.paymentData.expiry - Structured date shorthand notation string representing target expiration bounds ("MM/YY").
 * @param {string} props.paymentData.cvv - Card verification value security cipher token.
 * @param {number} props.totalAmount - Aggregated numeric value of invoice parameters translated to final checkout cost.
 * @param {Function} props.onUpdate - Callback dispatch function triggered when editing field entities. Expects field name and raw string payload.
 * @param {Function} props.onNext - Pipeline control navigation callback targeting sequential step execution flow.
 * @param {Function} props.onPrev - Pipeline control navigation callback targeting historical step backflow.
 * @param {string|null} props.error - Localized descriptive message reporting upstream transaction execution errors.
 * @param {boolean} props.isFlipped - Interactive layout state toggle identifying if the 3D card wrapper mesh exposes its backface.
 * @param {Function} props.setIsFlipped - Mutation dispatch callback handler dedicated to altering the spatial flip animation boundary states.
 * @param {Object} props.i18n - Explicit translation dictionary slice for visual UI labels.
 * @param {string} props.i18n.cardHolder - Cardholder title placeholder descriptor.
 * @param {string} props.i18n.demoUser - Static simulation fallback username label.
 * @param {string} props.i18n.expires - Expiration date title string marker.
 * @param {string} props.i18n.securityCode - Security cipher CVV text marker.
 * @param {string} props.i18n.demoHint - Explanatory warning badge string token header.
 * @param {string} props.i18n.demoHintUSe - Directive operation instruction text node.
 * @param {string} props.i18n.codeToSuceed - Instructional trailing text layout constraint.
 * @param {string} props.i18n.paymentError - Error panel title text designation indicator.
 * @param {string} props.i18n.backButton - Navigation funnel reversal trigger text.
 * @param {string} props.i18n.payButton - Transaction confirmation execution submit payload text.
 * @returns {React.JSX.Element} An interactive payment form accompanied by a dynamic card mesh visualization layer.
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
  i18n,
}) => {
  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {/* 1. VISUAL CARD ANIMATION (3D FLIP) */}
      <div className="perspective-1000 w-full h-44 mb-8">
        <div
          className={`relative w-full h-full transition-all duration-700 preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* FRONT SIDE */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-primary-hover to-primary rounded-2xl p-6 text-inverse shadow-2xl flex flex-col justify-between border border-inverse/10">
            <div className="flex justify-between items-start">
              <div className="w-10 h-7 bg-amber-400/20 rounded border border-amber-400/40" />
              <span className="font-bold italic text-secondary-muted">
                VISA
              </span>
            </div>
            <p className="text-xl font-mono tracking-[0.25em] text-center text-inverse">
              {paymentData.cardNumber || "•••• •••• •••• ••••"}
            </p>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[9px] uppercase text-secondary-muted mb-0.5">
                  {i18n.cardHolder}
                </p>
                <p className="text-xs font-medium tracking-widest uppercase text-inverse">
                  {i18n.demoUser}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase text-secondary-muted mb-0.5">
                  {i18n.expires}
                </p>
                <p className="text-sm font-mono text-inverse">
                  {paymentData.expiry || "MM/YY"}
                </p>
              </div>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-primary rounded-2xl py-6 text-inverse shadow-2xl flex flex-col border border-inverse/10">
            <div className="w-full h-10 bg-primary-hover mb-4" />
            <div className="px-6">
              <p className="text-[8px] text-right text-secondary-muted uppercase mb-1">
                {i18n.securityCode}
              </p>
              <div className="bg-secondary-light h-9 rounded flex items-center justify-end px-4 border border-secondary-border">
                <span className="text-primary font-mono font-bold italic tracking-widest">
                  {paymentData.cvv || "•••"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DEMO HINT & ERROR ALERT */}
      <div className="space-y-4 mb-6">
        <div className="p-3 bg-accent-muted border border-secondary-border rounded-xl flex items-center gap-3">
          <span className="text-lg">ℹ️</span>
          <p className="text-[11px] text-accent leading-tight">
            <strong>{i18n.demoHint}:</strong> {i18n.demoHintUSe}{" "}
            <code className="font-bold bg-secondary-light px-1">4242</code>
            {i18n.codeToSuceed}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-danger-light border-l-4 border-danger text-danger text-xs rounded-r-lg animate-in shake-x duration-300">
            <p className="font-bold">{i18n.paymentError}</p>
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* 3. INPUTS FORM WITH LIVE SANITIZATION HANDLERS */}
      <div className="space-y-4">
        <PrimaryInput
          placeholder="Card Number"
          value={paymentData.cardNumber}
          onFocus={() => setIsFlipped(false)}
          onChange={(e) =>
            onUpdate("cardNumber", formatCardNumber(e.target.value))
          }
          error={!!error}
        />

        <div className="grid grid-cols-2 gap-4">
          <PrimaryInput
            placeholder="MM/YY"
            value={paymentData.expiry}
            onFocus={() => setIsFlipped(false)}
            onChange={(e) =>
              onUpdate("expiry", formatExpiryDate(e.target.value))
            }
          />
          <PrimaryInput
            placeholder="CVC"
            value={paymentData.cvv}
            onFocus={() => setIsFlipped(true)}
            onChange={(e) => onUpdate("cvv", formatCVC(e.target.value))}
          />
        </div>
      </div>

      {/* 4. FOOTER BUTTONS */}
      <div className="flex gap-4 mt-8">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 py-4 text-secondary font-bold hover:bg-secondary-light rounded-xl transition-colors active:scale-95"
        >
          {i18n.backButton}
        </button>
        <PrimaryButton onClick={onNext} fullWidth={false} className="flex-[2]">
          {i18n.payButton} {formatCurrency(totalAmount)}
        </PrimaryButton>
      </div>
    </div>
  );
};

PaymentStep.propTypes = {
  paymentData: PropTypes.shape({
    cardNumber: PropTypes.string.isRequired,
    expiry: PropTypes.string.isRequired,
    cvv: PropTypes.string.isRequired,
  }).isRequired,
  totalAmount: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
  error: PropTypes.string,
  isFlipped: PropTypes.bool.isRequired,
  setIsFlipped: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    cardHolder: PropTypes.string.isRequired,
    demoUser: PropTypes.string.isRequired,
    expires: PropTypes.string.isRequired,
    securityCode: PropTypes.string.isRequired,
    demoHint: PropTypes.string.isRequired,
    demoHintUSe: PropTypes.string.isRequired,
    codeToSuceed: PropTypes.string.isRequired,
    paymentError: PropTypes.string.isRequired,
    backButton: PropTypes.string.isRequired,
    payButton: PropTypes.string.isRequired,
  }).isRequired,
};

export default PaymentStep;
