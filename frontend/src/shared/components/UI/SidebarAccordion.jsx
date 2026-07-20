/**
 * @file SidebarAccordion.jsx
 * @description Adaptive sidebar orchestrator component. Transforms standard layout
 * widgets into a touch-optimized semantic accordion interface on mobile viewports
 * while flattening into a rigid grid on desktop environments.
 * @module shared/components/UI/SidebarAccordion
 * @author Nico Paez
 */

import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * SidebarAccordion Polymorphic Presentational Component.
 *
 * Architectural Strategy:
 * - Fluid Layout Transition: Bypasses mobile interaction boundaries on desktop viewports (`md:`),
 *   stripping card containers, shadow layers, and overflow rules to enforce static vertical placement.
 * - Hardware Accelerated Animation: Employs controlled CSS max-height transitions coupled with
 *   opacity filters to prevent rendering pipeline delays during programmatic state expansion.
 * - Semantic Isolation: Enforces layout properties downstream onto children nodes without
 *   intercepting state scopes or causing business context re-evaluation.
 *
 * @component
 * @category Components/Shared/UI
 * @param {Object} props - Component property payloads.
 * @param {Array} props.widgets - Data array configuration establishing title strings and runtime components.
 * @returns {React.JSX.Element|null} A responsive grid matrix containing layout structures or null if empty.
 */
const SidebarAccordion = ({ widgets = [] }) => {
  /**
   * Internal Managed State Tracking.
   * Stores the currently expanded section index pointer on mobile devices.
   * @type {number|null}
   */
  const [activeIndex, setActiveIndex] = useState(null);

  /**
   * Toggles the active section selection state or closes the fold if executed on an active index.
   * @param {number} index - The target loop node selection index.
   */
  const toggleWidget = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!widgets || widgets.length === 0) return null;

  return (
    <aside
      className="w-full space-y-3 md:space-y-8"
      role="complementary"
      aria-label="Filters and tools"
    >
      {widgets.map((widget, index) => {
        const isOpen = activeIndex === index;

        return (
          <div
            key={widget.id || index}
            className="bg-surface rounded-2xl border border-slate-100 shadow-sm overflow-hidden 
                       transition-all duration-300
                       md:border-none md:shadow-none md:bg-transparent md:overflow-visible"
          >
            {/* Widget Interactive Header Trigger (Mobile only) */}
            <button
              type="button"
              onClick={() => toggleWidget(index)}
              className="w-full flex items-center justify-between p-4 text-left font-bold text-secondary 
                         md:p-0 md:mb-4 md:pointer-events-none md:cursor-default selection:bg-transparent"
              aria-expanded={isOpen}
            >
              <h3 className="text-sm sm:text-base tracking-wide uppercase font-black text-primary md:text-primary">
                {widget.title}
              </h3>

              {/* Action indicator glyph, hidden from viewports above mobile thresholds */}
              <div className="md:hidden transition-transform duration-300 shrink-0 text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </button>

            {/* Content Viewport Frame with hardware-accelerated fallback layers */}
            <div
              className={`transition-all duration-300 ease-in-out 
                md:!max-h-none md:!opacity-100 md:!visible md:!overflow-visible
                ${
                  isOpen
                    ? "max-h-[1000px] opacity-100 visible border-t border-slate-50"
                    : "max-h-0 opacity-0 invisible"
                }`}
            >
              {/* Internal layout boundary. Emulates standard clean card designs on desktop grids */}
              <div
                className="p-4 pt-2 text-sm text-secondary
                           md:p-5 md:bg-surface md:rounded-2xl md:border md:border-slate-100 md:shadow-sm"
              >
                {widget.component}
              </div>
            </div>
          </div>
        );
      })}
    </aside>
  );
};

SidebarAccordion.propTypes = {
  widgets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired,
    })
  ),
};

export default SidebarAccordion;
