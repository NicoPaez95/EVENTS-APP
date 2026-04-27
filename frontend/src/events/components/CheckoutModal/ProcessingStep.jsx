import React from "react";

/**
 * ProcessingStep - Presentational Component
 * Now purely responsible for the UI during the processing phase.
 * It no longer manages its own timing or lifecycle.
 */
const ProcessingStep = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 animate-in fade-in duration-500">
      {/* Animated Spinner */}
      <div className="relative mb-8">
        <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl" role="img" aria-label="secure-lock">
            🔒
          </span>
        </div>
      </div>

      <h4 className="text-xl font-bold text-gray-900 mb-2">
        Processing Payment
      </h4>

      <p className="text-gray-500 text-center max-w-xs text-sm">
        We are securely validating your transaction with your bank. Please do
        not close this window.
      </p>

      {/* Progress Bar Animation */}
      <div className="mt-8 w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-blue-600 animate-pulse w-full"></div>
      </div>
    </div>
  );
};

export default ProcessingStep;
