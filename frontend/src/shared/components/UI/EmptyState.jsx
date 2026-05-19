/**
 * @file EmptyState.jsx
 * @description Presentational component designed to handle empty collections, search mismatches, or filter anomalies.
 * Provides rich hierarchical typography, contextual icon indicators, and an optional action core to restore UI flows.
 * @module components/shared/UI/EmptyState
 * @author Nico Paez
 */

import React from "react";
import PrimaryButton from "./PrimaryButton";

/**
 * @typedef {Object} EmptyStateProps
 * @property {string} [message] - Backward compatible single-line message parameter. Acts as title if 'title' prop is omitted.
 * @property {string} [title="No items found"] - High-level bold feedback headline summarizing the current interface status.
 * @property {string} [description="Try adjusting your parameters..."] - Secondary typographic instruction guiding the user toward system resolution.
 * @property {string} [actionLabel] - Alphanumeric text sequence applied to the primary actionable button core.
 * @property {function(): void} [onAction] - Execution callback pipeline method triggered to resolve the empty boundary state (e.g., reset filters).
 */

/**
 * EmptyState Presentational Component.
 *
 * A robust, accessible, and decoupled dumb UI component capable of reflecting platform fallback
 * layouts. Supports legacy contract integration parameters alongside operational callback actions.
 *
 * @component
 * @category Components/Shared/UI
 * @param {EmptyStateProps} props - Component property payloads.
 * @returns {JSX.Element} An accessible, semantically correct empty state component layer.
 */
const EmptyState = ({
  message,
  title = "No items found",
  description = "Try adjusting your parameters, keywords, or filters to explore premium experiences.",
  actionLabel,
  onAction,
}) => {
  /* 1. Graceful degradation fallback to preserve older component invocation signatures */
  const headline = message || title;
  const isLegacyInvocation = !!message && !onAction;

  return (
    <div
      className="flex flex-col items-center justify-center text-center p-12 bg-slate-50/50 border border-dashed border-slate-200 rounded-3xl animate-in fade-in zoom-in-95 duration-300 my-4"
      role="status"
      aria-live="polite"
    >
      {/* 2. Visual Icon Anchor (Hidden from screen readers if decorative) */}
      {!isLegacyInvocation && (
        <div
          className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl mb-5 shadow-inner select-none animate-bounce duration-1000"
          aria-hidden="true"
        >
          🔍
        </div>
      )}

      {/* 3. Semantic Typography Hierarchy */}
      <h3 className="text-lg font-bold text-slate-800 tracking-tight max-w-md">
        {headline}
      </h3>

      {!isLegacyInvocation && (
        <p className="text-sm font-medium text-slate-500 mt-2 max-w-sm leading-relaxed">
          {description}
        </p>
      )}

      {/* 4. Action Core Integration */}
      {onAction && actionLabel && (
        <div className="mt-6 min-w-[140px]">
          <PrimaryButton onClick={onAction} size="sm">
            {actionLabel}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
