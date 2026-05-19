import { useState } from 'react';
import { formatCardNumber, formatExpiryDate, formatCVC } from '../utils/paymentFormatter';

/**
 * @typedef {Object} PaymentData
 * @property {string} cardNumber - The 16-digit card number with space formatting.
 * @property {string} expiry - The MM/YY expiration date.
 * @property {string} cvc - The 3-digit security code.
 */

/**
 * @typedef {Object} TicketResult
 * @property {string} ticketId - A unique identifier for the generated ticket.
 * @property {string} qrValue - A JSON string payload for the QR code generation.
 */

/**
 * useCheckout Hook.
 * 
 * A custom "Headless" hook that manages the complex state and business logic
 * for the multi-step event ticket purchasing flow.
 * 
 * Key features:
 * - Step-by-step navigation (Quantity -> Payment -> Processing -> Success).
 * - Automatic credit card field formatting.
 * - Simulated asynchronous payment processing with built-in demo error cases.
 * - Dynamic Ticket and QR code generation upon successful transaction.
 *
 * @param {Object} event - The selected event data from the domain.
 * @returns {Object} Checkout state and controller functions.
 */
export const useCheckout = (event) => {
  // Navigation State
  const [currentStep, setCurrentStep] = useState(1);
  const [quantity, setQuantity] = useState(1);

  // Payment Information State
  const [paymentData, setPaymentData] = useState({ cardNumber: '', expiry: '', cvc: '' });
  const [error, setError] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  // Post-Purchase Data State
  const [ticketData, setTicketData] = useState(null);

  /** @type {number} The computed raw final price based on selected quantity. */
  const totalAmount = quantity * (event?.price || 0);

  /**
   * Updates and formats payment field values.
   * Ensures data integrity by applying specific formatting rules for cards and dates.
   * @param {Partial<PaymentData>} newData - An object containing the fields to update.
   */
  const updatePaymentData = (newData) => {
    const updated = { ...newData };
    if (updated.cardNumber !== undefined) updated.cardNumber = formatCardNumber(updated.cardNumber).substring(0, 19);
    if (updated.expiry !== undefined) updated.expiry = formatExpiryDate(updated.expiry).substring(0, 5);
    if (updated.cvc !== undefined) updated.cvc = formatCVC(updated.cvc).substring(0, 3);
    setPaymentData(prev => ({ ...prev, ...updated }));
  };

  /**
   * Orchestrates the payment submission process.
   * 1. Resets previous errors and triggers the processing view.
   * 2. Simulates a 2s server delay.
   * 3. Validates against demo card numbers (e.g., 4000 triggers an error).
   * 4. Generates a unique ticket and QR payload upon success.
   * @async
   */
  const handlePaymentSubmit = async () => {
    setError(null);
    setCurrentStep(3); // Start Processing Step

    try {
      // Simulate network latency for banking validation
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Demo logic: Card numbers starting with 4000 are rejected for testing purposes
          if (paymentData.cardNumber.replace(/\s/g, '').startsWith('4000')) {
            reject(new Error("Card declined. Use 4242 to test success."));
          } else {
            resolve();
          }
        }, 2000);
      });

      // --- TICKET GENERATION LOGIC ---
      const generatedId = `TKT-${event.id}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const qrPayload = JSON.stringify({
        id: generatedId,
        event: event.title,
        qty: quantity,
        user: "Demo User",
        timestamp: new Date().toISOString()
      });

      setTicketData({ ticketId: generatedId, qrValue: qrPayload });
      setCurrentStep(4); // Move to Success Step
    } catch (err) {
      // Recovery logic: return to payment form with error feedback
      setError(err.message);
      setCurrentStep(2);
      setIsFlipped(false);
    }
  };

  return {
    // States
    currentStep,
    quantity,
    paymentData,
    totalAmount, // Retained as a raw numeric value to avoid presentation coupling inside headless state
    error,
    isFlipped,
    ticketData,

    // Actions
    setIsFlipped,
    /** @param {number} val - Amount to add (use -1 for decrement). */
    handleQuantity: (val) => setQuantity(prev => Math.max(1, prev + val)),
    updatePaymentData,
    nextStep: () => setCurrentStep(prev => prev + 1),
    /** Clears errors and moves back one step. */
    prevStep: () => { setError(null); setCurrentStep(prev => prev - 1); },
    handlePaymentSubmit,
    /** Resets the entire flow to its initial state (used when closing the modal). */
    resetCheckout: () => {
      setCurrentStep(1);
      setError(null);
      setTicketData(null);
      setIsFlipped(false);
    }
  };
};