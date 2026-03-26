import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCheckout } from '../../hooks/useCheckout';

// Sub-components for each step of the flow
import QuantityStep from '../../components/CheckoutModal/QuantityStep';
import PaymentStep from '../../components/CheckoutModal/PaymentStep';
import ProcessingStep from '../../components/CheckoutModal/ProcessingStep';
import SuccessStep from '../../components/CheckoutModal/SuccessStep';

/**
 * CheckoutModal Component (Orchestrator).
 * * This "Smart Component" manages the entire ticket purchasing lifecycle.
 * It uses the `useCheckout` headless hook to handle business logic and 
 * coordinates the transitions between Quantity, Payment, Processing, and Success steps.
 * * It utilizes React Portals to render the modal outside the main DOM hierarchy
 * for better accessibility and Z-index management.
 *
 * @component
 * @category Features/Events/Checkout
 * * @param {Object} props - Component props.
 * @param {boolean} props.isOpen - Boolean flag to control modal visibility.
 * @param {Function} props.onClose - Callback to trigger the closing of the modal.
 * @param {Object} props.event - The event data object to be processed.
 * * @returns {React.ReactPortal|null} The rendered modal via Portal or null if closed.
 */
const CheckoutModal = ({ isOpen, onClose, event }) => {
  const checkout = useCheckout(event);

  /**
   * Effect to manage side effects during the modal lifecycle:
   * 1. Resets the checkout state with a small delay when closing to prevent visual flickering.
   * 2. Toggles body scroll overflow to prevent background scrolling when active.
   */
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => checkout.resetCheckout(), 300);
      return () => clearTimeout(timer);
    }
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
        aria-hidden="true"
      />
      
      {/* Modal Container */}
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300"
        role="dialog"
        aria-modal="true"
      >
        
        {/* Close Button */}
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
          {/* STEP 1: Quantity Selection */}
          {checkout.currentStep === 1 && (
            <QuantityStep 
              event={event} 
              quantity={checkout.quantity} 
              totalAmount={checkout.totalAmount}
              onQuantityChange={checkout.handleQuantity} 
              onNext={checkout.nextStep} 
            />
          )}

          {/* STEP 2: Payment Form & 3D Card Card */}
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

          {/* STEP 3: Processing Screen */}
          {checkout.currentStep === 3 && (
            <ProcessingStep onNext={checkout.nextStep} />
          )}

          {/* STEP 4: Final Confirmation & QR */}
          {checkout.currentStep === 4 && (
            <SuccessStep 
              event={event} 
              quantity={checkout.quantity} 
              ticketData={checkout.ticketData} 
              onClose={onClose} 
            />
          )}
        </div>

        {/* Security Decorative Footer */}
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
   * We render the content into the 'modal-root' div to ensure 
   * it stays above all other UI elements.
   */
  return createPortal(modalContent, document.getElementById('modal-root'));
};

export default CheckoutModal;