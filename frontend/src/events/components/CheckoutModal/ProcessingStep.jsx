import React, { useEffect } from 'react';

/**
 * ProcessingStep Component.
 * * This component provides visual feedback during the payment authorization phase.
 * It simulates network latency to manage user expectations regarding banking security
 * and transaction validation.
 *
 * @component
 * @category Components/Events/Checkout
 * * @param {Object} props - Component props.
 * @param {Function} props.onNext - Callback function triggered after the simulated 
 * delay to transition the UI to the success or error state.
 * * @returns {JSX.Element} A centered layout with a spinner and security indicators.
 */
const ProcessingStep = ({ onNext }) => {
  
  useEffect(() => {
    /**
     * Simulated Network Latency.
     * We use a 3.5s delay to represent the round-trip time of a 
     * typical secure banking handshake.
     */
    const timer = setTimeout(() => {
      onNext();
    }, 3500);

    // Cleanup function to prevent memory leaks if the component unmounts
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-500">
      
      {/* Animated Spinner with Security Icon */}
      <div className="relative mb-8">
        <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl" role="img" aria-label="secure-lock">🔒</span>
        </div>
      </div>

      <h4 className="text-xl font-bold text-gray-900 mb-2">Processing Payment</h4>
      
      <p className="text-gray-500 text-center max-w-xs text-sm">
        We are securely validating your transaction with your bank. 
        Please do not close this window.
      </p>

      {/* Subtle Progress Bar */}
      <div className="mt-8 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 animate-pulse"></div>
      </div>
    </div>
  );
};

export default ProcessingStep;