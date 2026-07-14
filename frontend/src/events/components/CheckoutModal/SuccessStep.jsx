/**
 * @file SuccessStep.jsx
 * @description Presentational step component for the checkout success confirmation.
 * Renders a high-fidelity virtual ticket slice embedded with a secure QR code scanner canvas.
 * @module components/events/Checkout/SuccessStep
 * @author Nico Paez
 */

import React from "react";
import PropTypes from "prop-types";
import { QRCodeCanvas } from "qrcode.react";
import PrimaryButton from "shared/components/UI/PrimaryButton";

/**
 * @typedef {Object} TicketData
 * @property {string} qrValue - The encoded transactional hash token string used to generate the QR code.
 * @property {string} ticketId - Unique alphanumeric structural identifier matching the database entry.
 */

/**
 * SuccessStep Presentational Component.
 *
 * Displays a clean operational invoice wrap-up. Renders the generated ticket metadata and
 * bridges transactional status data visually into standard presentational layout models.
 *
 * @component
 * @category Components/Events/Checkout
 * @param {Object} props - Component properties.
 * @param {Object} props.event - Localized single-language view model event instance.
 * @param {string} props.event.title - Already resolved single-language display title.
 * @param {TicketData} props.ticketData - Structural state data capturing finalized purchase confirmations.
 * @param {Function} props.onClose - State machine dispatcher interceptor flushing filters and resetting workflow stages.
 * @param {Object} props.i18n - Explicit translation dictionary slice for visual UI labels.
 * @param {string} props.i18n.purchaseSuccessful - Success header announcement status text.
 * @param {string} props.i18n.entryFor - Introductory phrasing segment for the event descriptor title wrapper.
 * @param {string} props.i18n.isready - Concluding baseline structural string specifying item clearance instructions.
 * @param {string} props.i18n.finish - Submittal action text rendered inside the completion pipeline button.
 * @returns {React.JSX.Element|null} A stationary presentational visualization layer or null if security bounds are breached.
 */
const SuccessStep = ({ event, ticketData, onClose, i18n }) => {
  /**
   * Safety Guard: Prevents the component from crashing if the
   * checkout state was not correctly populated.
   */
  if (!ticketData || !event) return null;

  return (
    <div className="flex flex-col items-center animate-in zoom-in duration-500">
      {/* Success Badge */}
      <div className="w-16 h-16 bg-danger-light rounded-full flex items-center justify-center mb-4">
        <span className="text-3xl" role="img" aria-label="success-check">
          ✅
        </span>
      </div>

      <h4 className="text-2xl font-black text-primary mb-1 text-center">
        {i18n.purchaseSuccessful}
      </h4>

      <p className="text-secondary text-center text-sm mb-6 px-4">
        {i18n.entryFor} <strong>{event.title}</strong> {i18n.isready}
      </p>

      {/* VIRTUAL TICKET VISUALIZATION */}
      <div className="bg-secondary-light p-6 rounded-3xl border-2 border-dashed border-secondary-border flex flex-col items-center w-full shadow-inner mb-6">
        {/* QR Code Container */}
        <div className="bg-surface p-3 rounded-2xl shadow-sm mb-4 border border-secondary-border">
          <QRCodeCanvas
            value={ticketData.qrValue}
            size={160}
            level="H"
            includeMargin
          />
        </div>

        {/* Ticket Metadata */}
        <div className="text-center">
          <p className="text-[10px] font-bold text-secondary-muted uppercase tracking-[0.2em] mb-1">
            Ticket ID
          </p>
          <p className="font-mono text-xs text-secondary bg-secondary-border/50 px-3 py-1 rounded-full italic">
            {ticketData.ticketId}
          </p>
        </div>
      </div>

      {/* Completion Button */}
      <PrimaryButton onClick={onClose}>{i18n.finish}</PrimaryButton>
    </div>
  );
};

SuccessStep.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  ticketData: PropTypes.shape({
    qrValue: PropTypes.string.isRequired,
    ticketId: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    purchaseSuccessful: PropTypes.string.isRequired,
    entryFor: PropTypes.string.isRequired,
    isready: PropTypes.string.isRequired,
    finish: PropTypes.string.isRequired,
  }).isRequired,
};

SuccessStep.defaultProps = {
  event: null,
  ticketData: null,
};

export default SuccessStep;
