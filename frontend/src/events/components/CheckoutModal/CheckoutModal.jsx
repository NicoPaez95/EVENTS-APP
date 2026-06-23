/**
 * @file CheckoutModal.jsx
 * @description Presentational structural framework for the secure checkout ecosystem.
 * Dynamically switches internal atomic step interfaces based on operational flags.
 * @module components/events/components/CheckoutModal/CheckoutModal
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import QuantityStep from "./QuantityStep";
import PaymentStep from "./PaymentStep";
import ProcessingStep from "./ProcessingStep";
import SuccessStep from "./SuccessStep";
import CloseButton from "shared/components/UI/CloseButton";

/**
 * CheckoutModal Presentational Component.
 *
 * Provides the visual structural shell, background glass backdrop blur effect,
 * conditional top banner stack for bulk/single events, and switches layout states
 * between ticket selection, credit card forms, and final completion ticketing tokens.
 *
 * @component
 * @category Components/Events
 * @param {Object} props - Component properties.
 * @param {Function} props.onClose - Trigger callback dispatched to dismiss the layout.
 * @param {Object} props.event - Selected event data containing titles, prices, and media arrays.
 * @param {number} props.currentStep - Sequential state machine active step indicator (1 to 4).
 * @param {Object} props.checkoutProps - Destructured functional operations and states bundled by the hook.
 * @param {Object} props.i18n - Layered translation map namespaces extracted from localization files.
 * @returns {React.JSX.Element} The rendered modal structural shell layout.
 */
const CheckoutModal = ({
  onClose,
  event,
  currentStep,
  checkoutProps,
  i18n,
}) => {
  const stackRotations = [
    "-rotate-6 -translate-x-4",
    "rotate-0 z-10 scale-105",
    "rotate-6 translate-x-4",
  ];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface Structure */}
      <div
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-300 flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* --- HERO MEDIA BANNER (Dynamic Stack Selection) --- */}
        {(event.image || event.images?.length > 0) && currentStep < 3 && (
          <div className="relative w-full h-44 bg-slate-950 overflow-hidden flex items-center justify-center select-none">
            {event.isBulk && event.images?.length > 0 ? (
              <>
                <img
                  src={event.images[0]}
                  alt="Ambient backdrop blur"
                  className="absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110 pointer-events-none"
                />
                <div className="relative flex items-center justify-center w-full h-full pt-2">
                  {event.images.slice(0, 3).map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Batch asset item detail ${index + 1}`}
                      className={`w-20 h-28 object-cover rounded-xl shadow-2xl border-2 border-white/90 transition-transform duration-300 ${
                        stackRotations[index] || ""
                      }`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/10 pointer-events-none" />

            {event.isBulk && (
              <span className="absolute bottom-3 left-4 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md z-20">
                {checkoutProps.cartLot}
              </span>
            )}
          </div>
        )}

        {/* Close Interaction Point */}
        <div className="absolute top-4 right-4 z-20">
          <CloseButton onClick={onClose} ariaLabel="Close modal" />
        </div>

        {/* Dynamic Composite Step Pipeline */}
        <div className="p-8 flex-grow">
          {currentStep === 1 && (
            <QuantityStep
              event={event}
              quantity={checkoutProps.quantity}
              totalAmount={checkoutProps.totalAmount}
              onQuantityChange={checkoutProps.handleQuantity}
              onNext={checkoutProps.nextStep}
              i18n={i18n.quantityStep}
            />
          )}

          {currentStep === 2 && (
            <PaymentStep
              paymentData={checkoutProps.paymentData}
              totalAmount={checkoutProps.totalAmount}
              onUpdate={checkoutProps.updatePaymentData}
              onNext={checkoutProps.handlePaymentSubmit}
              onPrev={checkoutProps.prevStep}
              error={checkoutProps.error}
              isFlipped={checkoutProps.isFlipped}
              setIsFlipped={checkoutProps.setIsFlipped}
              i18n={i18n.paymentStep}
            />
          )}

          {currentStep === 3 && <ProcessingStep i18n={i18n.processingStep} />}

          {currentStep === 4 && (
            <SuccessStep
              event={event}
              quantity={checkoutProps.quantity}
              ticketData={checkoutProps.ticketData}
              onClose={onClose}
              i18n={i18n.successStep}
            />
          )}
        </div>

        {/* Security Baseline Context */}
        {currentStep < 4 && (
          <div className="bg-gray-50 py-3 border-t border-gray-100 flex justify-center items-center gap-2 mt-auto">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {i18n.paymentFramework}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

CheckoutModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    price: PropTypes.number,
    image: PropTypes.string,
    images: PropTypes.array,
    isBulk: PropTypes.bool,
  }).isRequired,
  currentStep: PropTypes.number.isRequired,
  checkoutProps: PropTypes.shape({
    quantity: PropTypes.number.isRequired,
    totalAmount: PropTypes.number.isRequired,
    paymentData: PropTypes.object.isRequired,
    error: PropTypes.string,
    isFlipped: PropTypes.bool,
    ticketData: PropTypes.object,
    cartLot: PropTypes.string,
    handleQuantity: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired,
    prevStep: PropTypes.func.isRequired,
    updatePaymentData: PropTypes.func.isRequired,
    handlePaymentSubmit: PropTypes.func.isRequired,
    setIsFlipped: PropTypes.func,
  }).isRequired,
  i18n: PropTypes.shape({
    paymentFramework: PropTypes.string,
    quantityStep: PropTypes.object,
    paymentStep: PropTypes.object,
    processingStep: PropTypes.object,
    successStep: PropTypes.object,
  }).isRequired,
};

export default CheckoutModal;
