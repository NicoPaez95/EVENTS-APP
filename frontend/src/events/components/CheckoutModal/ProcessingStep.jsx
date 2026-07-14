/**
 * @file ProcessingStep.jsx
 * @description Presentational step component for the transaction processing state.
 * Displays structural secure loading indicators while a banking simulation resolves background requests.
 * @module components/events/Checkout/ProcessingStep
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";

/**
 * ProcessingStep Presentational Component.
 *
 * Renders a secure, high-fidelity spinner accompanied by progress bars to indicate transaction progression.
 * Strictly decoupled from state, lifecycles, or asynchronous time mutations.
 *
 * @component
 * @category Components/Events/Checkout
 * @param {Object} props - Component properties.
 * @param {Object} props.i18n - Explicit translation dictionary slice for visual UI labels.
 * @param {string} props.i18n.processingPayment - Heading status string identifying banking transaction progression.
 * @param {string} props.i18n.validate - Informational text guiding the user defensively not to interrupt the gateway.
 * @returns {React.JSX.Element} A stationary presentational loading layout view.
 */
const ProcessingStep = ({ i18n }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-500">
      {/* Animated Spinner */}
      <div className="relative mb-8">
        <div className="w-20 h-20 border-4 border-accent-muted border-t-accent rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl" role="img" aria-label="secure-lock">
            🔒
          </span>
        </div>
      </div>

      <h4 className="text-xl font-bold text-primary mb-2">
        {i18n.processingPayment}
      </h4>

      <p className="text-secondary text-center max-w-xs text-sm">
        {i18n.validate}
      </p>

      {/* Progress Bar Animation */}
      <div className="mt-8 w-48 h-1 bg-secondary-light rounded-full overflow-hidden">
        <div className="h-full bg-accent animate-pulse w-full" />
      </div>
    </div>
  );
};

ProcessingStep.propTypes = {
  i18n: PropTypes.shape({
    processingPayment: PropTypes.string.isRequired,
    validate: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProcessingStep;
