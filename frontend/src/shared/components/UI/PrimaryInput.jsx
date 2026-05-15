/**
 * @file PrimaryInput.jsx
 * @description Atomic layout component providing a standardized, accessible input text field.
 * Safely manages integrated labels, conditional error validation contexts, and dynamic styling classes.
 * @module components/shared/UI/PrimaryInput
 * @author Nico Paez
 */

import { cn } from "../../utils/cn";

/**
 * PrimaryInput Atomic Component.
 *
 * Encapsulates a native input control with a clean utility interface. Inherits all native
 * HTMLInputElement properties while managing structured error highlighting and semantic accessibility anchors.
 *
 * @component
 * @param {Object} props - Component properties including all standard HTML input attributes (e.g., type, value, placeholder, onChange, onFocus).
 * @param {string} [props.label] - Optional descriptive text rendered inside a semantic `<label>` node above the input track.
 * @param {string|boolean} [props.error] - Validation feedback string containing descriptive error logs. If truthy, shifts the input's visual themes.
 * @param {string} [props.id] - Unique target reference string matching the semantic link bounds between labels and inputs.
 * @param {string} [props.className=""] - Extra Tailwind utility style tokens passed from container views to customize input metrics.
 * @returns {JSX.Element} A flexible, interactive text entry layout node block.
 */
const PrimaryInput = ({ label, error, id, className = "", ...props }) => {
  return (
    <div className="space-y-2 w-full text-left">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-bold text-slate-700 ml-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          className={cn(
            // 1. Base default layout classes applied consistently
            "w-full px-4 py-3 border rounded-2xl transition-all outline-none",
            "focus:ring-4 focus:ring-blue-50 disabled:opacity-70 disabled:bg-slate-50",
            // 2. Conditional status validation styles evaluated dynamically
            error
              ? "border-red-300 bg-red-50 focus:border-red-500"
              : "border-slate-200 focus:border-blue-500 bg-white",
            // 3. User custom utility class overrides passed via props
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 font-medium ml-1 animate-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default PrimaryInput;
