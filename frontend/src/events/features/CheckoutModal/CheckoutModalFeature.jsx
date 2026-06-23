/**
 * @file CheckoutModalFeature.jsx
 * @description Multi-step ticket purchasing modal orchestrator. Restores step-based
 * sub-components rendering inside the secure structural surface.
 * @module components/events/features/CheckoutModal/CheckoutModalFeature
 * @author Nico Paez
 */

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { useCheckout } from "../../hooks/useCheckout";
import CheckoutModal from "../../components/CheckoutModal/CheckoutModal.jsx";
import { useTranslation } from "react-i18next";

/**
 * CheckoutModalFeature Smart Component (Orchestrator).
 *
 * Manages the multi-step purchasing state machine via custom hooks, restricts background
 * window scrolling behaviors upon engagement, and provisions a heavily structured
 * localized internationalization (i18n) bundle to child presentation surfaces.
 *
 * @component
 * @category Features/Checkout
 * @param {Object} props - Component properties.
 * @param {boolean} props.isOpen - Tracking toggle state mapping portal rendering layout visibility.
 * @param {Function} props.onClose - Action notification callback dispatched to unmount or slide out the active modal.
 * @param {Object} props.event - The structural event model instance selected for ticket generation purchase pipelines.
 * @returns {React.ReactPortal|null} React portal targeting the absolute #modal-root viewport node, or null.
 */
const CheckoutModalFeature = ({ isOpen, onClose, event }) => {
  /**
   * Gets the translation function scoped to the "events" namespace.
   * Use `t()` to access translations defined in events.json.
   */
  const { t } = useTranslation("events");

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
      i18n={{
        cartLot: t("CheckoutModal.cartLot"),
        paymentFramework: t("CheckoutModal.paymentFramework"),
        quantityStep: {
          load: t("CheckoutModal.quantityStep.load"),
          admission: t("CheckoutModal.quantityStep.admission"),
          formatCurrency: t("CheckoutModal.quantityStep.formatCurrency"),
          totalCalculation: t("CheckoutModal.quantityStep.totalCalculation"),
          total: t("CheckoutModal.quantityStep.total"),
          confirm: t("CheckoutModal.quantityStep.confirm"),
        },
        paymentStep: {
          cardHolder: t("CheckoutModal.paymentStep.cardHolder"),
          demoUser: t("CheckoutModal.paymentStep.demoUser"),
          expires: t("CheckoutModal.paymentStep.expires"),
          securityCode: t("CheckoutModal.paymentStep.securityCode"),
          demoHint: t("CheckoutModal.paymentStep.demoHint"),
          demoHintUSe: t("CheckoutModal.paymentStep.demoHintUSe"),
          codeToSuceed: t("CheckoutModal.paymentStep.codeToSuceed"),
          paymentError: t("CheckoutModal.paymentStep.paymentError"),
          backButton: t("CheckoutModal.paymentStep.backButton"),
          payButton: t("CheckoutModal.paymentStep.payButton"),
        },
        successStep: {
          purchaseSuccessful: t("CheckoutModal.successStep.purchaseSuccessful"),
          entryFor: t("CheckoutModal.successStep.entryFor"),
          isready: t("CheckoutModal.successStep.isready"),
          finish: t("CheckoutModal.successStep.finish"),
        },
        processingStep: {
          processingPayment: t(
            "CheckoutModal.processingStep.processingPayment"
          ),
          validate: t("CheckoutModal.processingStep.validate"),
        },
      }}
    />
  );

  return createPortal(modalContent, document.getElementById("modal-root"));
};

CheckoutModalFeature.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  event: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    price: PropTypes.number,
    image: PropTypes.string,
    images: PropTypes.array,
  }),
};

export default CheckoutModalFeature;
