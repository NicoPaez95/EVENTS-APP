/**
 * @file CheckoutModalFeature.jsx
 * @description Multi-step ticket purchasing modal orchestrator. Restores step-based
 * sub-components rendering inside the secure structural surface.
 * @module components/events/features/CheckoutModal/CheckoutModalFeature
 * @author Nico Paez
 */

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useCheckout } from "../../hooks/useCheckout";
import CheckoutModal from "../../components/CheckoutModal/CheckoutModal.jsx";

const CheckoutModalFeature = ({ isOpen, onClose, event }) => {
  const safeEvent = event || {
    id: "",
    title: "",
    price: 0,
    image: "",
    images: [],
  };
  const checkout = useCheckout(safeEvent);

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

  if (!isOpen) return null;

  const modalContent = (
    <CheckoutModal
      isOpen={isOpen}
      onClose={onClose}
      event={safeEvent}
      currentStep={checkout.currentStep}
      checkoutProps={{
        quantity: checkout.quantity,
        totalAmount: checkout.totalAmount,
        paymentData: checkout.paymentData,
        error: checkout.error,
        isFlipped: checkout.isFlipped,
        ticketData: checkout.ticketData,
        handleQuantity: checkout.handleQuantity,
        nextStep: checkout.nextStep,
        prevStep: checkout.prevStep,
        updatePaymentData: checkout.updatePaymentData,
        handlePaymentSubmit: checkout.handlePaymentSubmit,
        setIsFlipped: checkout.setIsFlipped,
      }}
    />
  );

  return createPortal(modalContent, document.getElementById("modal-root"));
};

export default CheckoutModalFeature;
