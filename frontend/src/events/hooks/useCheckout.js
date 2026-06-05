import { useState } from 'react';

/**
 * @typedef {Object} CheckoutItem
 * @property {string|number} id - The unique identifier for the event.
 * @property {string} title - The title of the event.
 * @property {number|string} price - The price per ticket (can be numerical or string formatted).
 * @property {number} [quantity=1] - The number of tickets to purchase.
 */

/**
 * Custom hook to manage the checkout wizard steps and payment processing.
 * Safely normalizes input to handle both single event objects and array collections.
 * * @param {CheckoutItem|CheckoutItem[]} [inputItems] - Single event item or array of items currently being purchased.
 * @returns {Object} The checkout state, total amount, and step handlers.
 */
export const useCheckout = (inputItems) => {
  // 1. Defensive normalization: Ensure we always operate on a structural array
  const items = Array.isArray(inputItems)
    ? inputItems
    : inputItems && inputItems.id
      ? [{ ...inputItems, quantity: inputItems.quantity || 1 }]
      : [];

  // 2. Sync single item quantity state to preserve backward compatibility with step components
  const initialQuantity = items.length === 1 ? items[0].quantity : 1;
  const [quantity, setQuantity] = useState(initialQuantity);

  /**
   * Defensive utility to sanitize and cast price properties to valid numbers.
   * Prevents runtime calculations from crashing with NaN values.
   * * @param {CheckoutItem} item - The checkout structural target asset.
   * @returns {number} Clean numerical representation of the unit price.
   */
  const getSafePrice = (item) => {
    if (!item || item.price === undefined || item.price === null) return 0;

    if (typeof item.price === 'string') {
      // Strips currency characters, commas, or spaces to isolate numeric dots/digits
      const sanitized = item.price.replace(/[^0-9.-]+/g, "");
      return parseFloat(sanitized) || 0;
    }

    return Number(item.price) || 0;
  };

  // 3. Derive total amount dynamically with strict number casting fallbacks to prevent NaN
  const totalAmount = items.length === 1
    ? quantity * getSafePrice(items[0])
    : items.reduce((sum, item) => sum + (getSafePrice(item) * (item.quantity || 1)), 0);

  // 4. Manage wizard steps sequential state machine
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [error, setError] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  /**
   * Updates state modifiers for individual quantities inside Step 1.
   * @param {number} newQuantity - Value to set.
   * @returns {void}
   */
  const handleQuantity = (newQuantity) => {
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  /**
   * Updates payment data values securely based on field inputs.
   * @param {string} field - Field identifier token.
   * @param {string} value - User raw input payload.
   * @returns {void}
   */
  const updatePaymentData = (field, value) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Advances the wizard workflow execution step.
   * @returns {void}
   */
  const nextStep = () => setCurrentStep((prev) => prev + 1);

  /**
   * Rewinds the wizard workflow execution step.
   * @returns {void}
   */
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  /**
   * Triggers the asynchronous transactional handshake validation sequence.
   * @returns {Promise<void>}
   */
  const handlePaymentSubmit = async () => {
    setError(null);
    setCurrentStep(3); // Transition to full Processing loader step
    setIsProcessing(true);

    try {
      // Simulate real-time standard external gateway API latency (e.g., Stripe sandbox)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock operational credential payload returns upon authorization success
      setTicketData({
        reservationId: `RES-${Math.floor(100000 + Math.random() * 900000)}`,
        qrPayload: "https://github.com/nicopaez",
      });

      setCurrentStep(4); // Advance to final Success screen view state
    } catch (err) {
      setError("The transaction could not be authorized. Please check your credit card data.");
      setCurrentStep(2); // Rollback step boundary to let the user re-submit details
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Resets the entire processing state tree to original baselines on unmount or closure.
   * @returns {void}
   */
  const resetCheckout = () => {
    setCurrentStep(1);
    setQuantity(initialQuantity);
    setIsProcessing(false);
    setIsFlipped(false);
    setError(null);
    setTicketData(null);
    setPaymentData({
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
    });
  };

  return {
    items,
    quantity,
    totalAmount,
    currentStep,
    isProcessing,
    isFlipped,
    error,
    ticketData,
    paymentData,
    setIsFlipped,
    handleQuantity,
    updatePaymentData,
    nextStep,
    prevStep,
    handlePaymentSubmit,
    resetCheckout,
  };
};