/**
 * @file PrimaryInput.jsx
 * @description Advanced atomic layout component providing a standardized, accessible input text field.
 * Safely manages integrated labels, conditional error validation contexts, and dynamic styling classes.
 * Supports externalized reference forwarding interfaces through specific callback injection keys.
 * @module components/shared/UI/PrimaryInput
 * @author Nico Paez
 */

import { cn } from "../../utils/cn";

/**
 * @typedef {Object} PrimaryInputProps
 * @property {string} [label] - Optional descriptive text rendered inside a semantic `<label>` node above the input track.
 * @property {string|boolean} [error] - Validation feedback string containing descriptive error logs. If truthy, shifts the input's visual themes.
 * @property {string} [id] - Unique target reference string matching the semantic link bounds between labels and inputs.
 * @property {string} [className=""] - Extra Tailwind utility style tokens passed from container views to customize input metrics.
 * @property {React.RefObject<HTMLInputElement>} [inputRef] - Programmatic reference instance to grant external access directly into the raw HTML element.
 */

/**
 * PrimaryInput Atomic Component.
 *
 * Encapsulates a native input control with a clean utility interface. Inherits all native
 * HTMLInputElement properties while managing structured error highlighting and semantic accessibility anchors.
 *
 * @component
 * @param {PrimaryInputProps & React.InputHTMLAttributes<HTMLInputElement>} props - Component properties combining atomic extensions and standard HTML elements.
 * @returns {React.JSX.Element} A flexible, interactive text entry layout node block.
 */
const PrimaryInput = ({
  label,
  error,
  id,
  className = "",
  inputRef,
  ...props
}) => {
  return (
    <div className="space-y-2 w-full text-left">
      {label && (
        <label htmlFor={id} className="block text-sm font-bold text-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          ref={inputRef}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            // 1. Base default layout classes applied consistently
            "w-full px-4 py-3 border border-secondary rounded-2xl transition-[border-color,box-shadow,background-color,opacity] duration-200 outline-none",
            "focus:ring-4  focus:ring-accent/30 disabled:opacity-70 disabled:bg-secondary/10",
            // 2. Conditional status validation styles evaluated dynamically
            error
              ? "border-red-300 bg-red-50 focus:border-red-500"
              : "border-secondary focus:border-accent bg-surface",
            // 3. User custom utility class overrides passed via props
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p
          id={`${id}-error`}
          className="text-red-500 text-xs mt-1 font-medium ml-1 animate-in slide-in-from-top-1"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default PrimaryInput;
