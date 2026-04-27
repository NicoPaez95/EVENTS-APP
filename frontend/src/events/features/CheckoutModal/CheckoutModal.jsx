import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useCheckout } from "../../hooks/useCheckout";

// Step-based sub-components
import QuantityStep from "../../components/CheckoutModal/QuantityStep";
import PaymentStep from "../../components/CheckoutModal/PaymentStep";
import ProcessingStep from "../../components/CheckoutModal/ProcessingStep";
import SuccessStep from "../../components/CheckoutModal/SuccessStep";

/**
 * @typedef {Object} EventData
 * @property {string|number} id - Unique event identifier.
 * @property {string} title - Event name.
 * @property {number} price - Unit price per ticket.
 */

/**
 * CheckoutModal Component (Orchestrator).
 *
 * This smart component manages the multi-step ticket purchasing flow.
 * It handles state transitions between selection, payment, and confirmation
 * using the `useCheckout` custom hook.
 *
 * Key features:
 * - React Portals for Z-index isolation.
 * - Body scroll locking during active state.
 * - Simulated payment processing delay.
 *
 * @component
 * @category Features/Checkout
 * @param {Object} props - Component props.
 * @param {boolean} props.isOpen - Visibility toggle for the modal.
 * @param {Function} props.onClose - Callback to terminate the checkout process.
 * @param {EventData} props.event - Data object of the event being purchased.
 * @returns {React.ReactPortal|null} Teleported modal tree or null if closed.
 */
const CheckoutModal = ({ isOpen, onClose, event }) => {
  const checkout = useCheckout(event);

  /**
   * Effect: Modal Lifecycle & UX Management.
   * - Prevents background scrolling by toggling `document.body` overflow.
   * - Implements a 300ms delayed state reset on close to ensure smooth exit animations.
   */
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => checkout.resetCheckout(), 300);
      return () => clearTimeout(timer);
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, checkout]);

  /**
   * Effect: Payment Processing Simulation.
   * Automatically advances to the success step after a 3.5s delay
   * when the checkout state enters the 'Processing' phase (Step 3).
   */
  useEffect(() => {
    if (isOpen && checkout.currentStep === 3) {
      const timer = setTimeout(() => {
        checkout.nextStep();
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, checkout.currentStep, checkout]);

  // Early return to prevent rendering before hook initialization logic
  if (!isOpen) return null;

  /**
   * Main Modal JSX Structure.
   * Defined as a constant to be passed into the Portal.
   */
  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop: Handles click-to-close behavior */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Close UI Action */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-400 hover:text-gray-600 p-2 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-8">
          {/* STEP 1: Ticket Quantity Configuration */}
          {checkout.currentStep === 1 && (
            <QuantityStep
              event={event}
              quantity={checkout.quantity}
              totalAmount={checkout.totalAmount}
              onQuantityChange={checkout.handleQuantity}
              onNext={checkout.nextStep}
            />
          )}

          {/* STEP 2: Payment Credentials & Interactive Card */}
          {checkout.currentStep === 2 && (
            <PaymentStep
              paymentData={checkout.paymentData}
              totalAmount={checkout.totalAmount}
              onUpdate={checkout.updatePaymentData}
              onNext={checkout.handlePaymentSubmit}
              onPrev={checkout.prevStep}
              error={checkout.error}
              isFlipped={checkout.isFlipped}
              setIsFlipped={checkout.setIsFlipped}
            />
          )}

          {/* STEP 3: Transaction Handshake (Visual Loader) */}
          {checkout.currentStep === 3 && <ProcessingStep />}

          {/* STEP 4: Success Confirmation & QR Receipt */}
          {checkout.currentStep === 4 && (
            <SuccessStep
              event={event}
              quantity={checkout.quantity}
              ticketData={checkout.ticketData}
              onClose={onClose}
            />
          )}
        </div>

        {/* Trust Badge Footer */}
        {checkout.currentStep < 4 && (
          <div className="bg-gray-50 py-3 border-t border-gray-100 flex justify-center items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Secured by Stripe Simulation
            </span>
          </div>
        )}
      </div>
    </div>
  );

  /**
   * Teleports the modal content to the 'modal-root' element.
   * Ensures the modal is rendered at the top level of the DOM.
   */
  return createPortal(modalContent, document.getElementById("modal-root"));
};

export default CheckoutModal;
