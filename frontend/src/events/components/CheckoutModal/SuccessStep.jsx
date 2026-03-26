import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

/**
 * @typedef {Object} TicketData
 * @property {string} qrValue - The encoded string used to generate the QR code.
 * @property {string} ticketId - Unique alphanumeric identifier for the transaction.
 */

/**
 * SuccessStep Component.
 * * This presentational component displays the final purchase confirmation.
 * It renders a visual representation of the ticket, including a generated 
 * QR code for event entry and the unique Ticket ID.
 *
 * @component
 * @category Components/Events/Checkout
 * * @param {Object} props - Component props.
 * @param {Object} props.event - The event data object (title, etc.).
 * @param {number} props.quantity - Total number of tickets purchased.
 * @param {TicketData} props.ticketData - Object containing the QR and ID information.
 * @param {Function} props.onClose - Callback to close the modal and finish the flow.
 * * @returns {JSX.Element|null} The success screen or null if ticketData is missing.
 */
const SuccessStep = ({ event, quantity, ticketData, onClose }) => {
  
  /**
   * Safety Guard: Prevents the component from crashing if the 
   * checkout state was not correctly populated.
   */
  if (!ticketData) return null;

  return (
    <div className="flex flex-col items-center animate-in zoom-in duration-500">
      
      {/* Success Badge */}
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-3xl" role="img" aria-label="success-check">✅</span>
      </div>

      <h4 className="text-2xl font-black text-gray-900 mb-1 text-center">
        Purchase Successful!
      </h4>
      
      <p className="text-gray-500 text-center text-sm mb-6 px-4">
        Your entry for <strong>{event.title}</strong> is ready. 
        Present this QR code at the entrance.
      </p>

      {/* VIRTUAL TICKET VISUALIZATION */}
      <div className="bg-gray-50 p-6 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center w-full shadow-inner mb-6">
        
        {/* QR Code Container */}
        <div className="bg-white p-3 rounded-2xl shadow-sm mb-4 border border-gray-100">
          <QRCodeCanvas 
            value={ticketData.qrValue} 
            size={160}
            level={"H"}
            includeMargin={true}
          />
        </div>
        
        {/* Ticket Metadata */}
        <div className="text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">
            Ticket ID
          </p>
          <p className="font-mono text-xs text-gray-600 bg-gray-200/50 px-3 py-1 rounded-full italic">
            {ticketData.ticketId}
          </p>
        </div>
      </div>

      {/* Completion Button */}
      <button 
        onClick={onClose}
        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg active:scale-95"
      >
        Finish
      </button>
    </div>
  );
};

export default SuccessStep;