/**
 * @file CheckoutModal.jsx
 * @description Presentational structural framework for the secure checkout ecosystem.
 * Dynamically switches internal atomic step interfaces based on operational flags.
 * @module components/events/components/CheckoutModal/CheckoutModal
 * @author Nico Paez
 */

import React from "react";
import QuantityStep from "./QuantityStep";
import PaymentStep from "./PaymentStep";
import ProcessingStep from "./ProcessingStep";
import SuccessStep from "./SuccessStep";
import CloseButton from "shared/components/UI/CloseButton";

const CheckoutModal = ({ onClose, event, currentStep, checkoutProps }) => {
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
                Lote Carrito
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
            />
          )}

          {currentStep === 3 && <ProcessingStep />}

          {currentStep === 4 && (
            <SuccessStep
              event={event}
              quantity={checkoutProps.quantity}
              ticketData={checkoutProps.ticketData}
              onClose={onClose}
            />
          )}
        </div>

        {/* Security Baseline Context */}
        {currentStep < 4 && (
          <div className="bg-gray-50 py-3 border-t border-gray-100 flex justify-center items-center gap-2 mt-auto">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Secured by Stripe Simulation
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
